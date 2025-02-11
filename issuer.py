import requests
import json
import sys
import re
import os

# GitHub repository details
repo_owner = "potpie-ai"
repo_name = "potpie"

issues_url = f"https://api.github.com/repos/{repo_owner}/{repo_name}/issues"
rate_limit_url = "https://api.github.com/rate_limit"

# Load token from environment variable
token = os.getenv("GITHUB_TOKEN")
if not token:
    print("Error: GitHub token not found. Set GITHUB_TOKEN environment variable.")
    sys.exit(1)

headers = {
    "Authorization": f"token {token}",
    "User-Agent": "MyApp",
}

def process_message(message):
    """Cleans up and formats message text."""
    if not message or not message.strip():
        return ""
    return re.sub(r'\n\s*\n+', '\n', message.strip())

def fetch_and_process_issues():
    """Fetches all issues (open and closed), processes comments, and outputs formatted JSON."""
    page = 1
    issues_data = []
    total_requests = 0  

    while True:
        response = requests.get(
            issues_url,
            params={"page": page, "per_page": 100, "state": "all"},
            headers=headers
        )
        total_requests += 1

        if response.status_code != 200:
            print(f"Failed to fetch issues. Status code: {response.status_code}")
            break

        issues = response.json()
        if not issues:
            break  

        for issue in issues:
            if "pull_request" in issue:
                continue  # Skip pull requests

            issue_id = issue["id"]
            title = issue["title"]
            state = issue["state"]
            issue_author = issue["user"]["login"]
            is_bot = "bot" in issue_author.lower()

            first_message = process_message(issue.get("body", ""))
            messages = first_message  

            # Fetch comments
            comments_url = issue["comments_url"]
            comments_response = requests.get(comments_url, headers=headers)
            total_requests += 1

            if comments_response.status_code == 200:
                comments = comments_response.json()
                filtered_comments = [
                    process_message(comment["body"])
                    for comment in comments if "bot" not in comment["user"]["login"]
                ]

                if filtered_comments:
                    messages += "\n---\n" + "\n---\n".join(filtered_comments)

            # If only the first message is present or the issue is created by a bot -> "no reaction"
            if first_message == messages or is_bot:
                state = "no reaction"

            issues_data.append({
                "title": title,
                "id": issue_id,
                "state": state, 
                "first": first_message,
                "messages": messages,
            })

        page += 1  

    # Check remaining API requests
    rate_limit_response = requests.get(rate_limit_url, headers=headers)
    total_requests += 1

    if rate_limit_response.status_code == 200:
        remaining_requests = rate_limit_response.json()["rate"]["remaining"]
    else:
        print(f"Failed to check rate limit. Status code: {rate_limit_response.status_code}")
        remaining_requests = None  

    return issues_data, total_requests, remaining_requests

if __name__ == "__main__":
    issues_data, total_requests, remaining_requests = fetch_and_process_issues()

    if "--output" in sys.argv and "json" in sys.argv:
        print(json.dumps(issues_data, indent=2))
    else:
        with open("issues.json", "w") as outfile:
            json.dump(issues_data, outfile, indent=4)

        print(f"Total Requests Made: {total_requests}")
        print(f"Remaining Requests: {remaining_requests if remaining_requests is not None else 'Could not fetch remaining requests'}")
