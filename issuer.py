import requests
import json
import sys
import re

# GitHub repository details
repo_owner = "cloudnative-pg"
repo_name = "cloudnative-pg"

# GitHub API URLs
issues_url = f"https://api.github.com/repos/{repo_owner}/{repo_name}/issues"
rate_limit_url = "https://api.github.com/rate_limit"  # Endpoint for rate limit info

# Your GitHub personal access token
token = "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"  # Replace with your actual token

# Set the headers, including the Authorization with your token
headers = {
    "Authorization": f"token {token}",
    "User-Agent": "MyApp",  # Optional, replace with your GitHub username or app name
}

def process_message(message):
    if not message or not message.strip():
        return ""  # Skip completely empty messages
    cleaned_message = re.sub(r'\n\s*\n+', '\n', message.strip())  # Remove extra blank lines
    return cleaned_message


# Fetch and process issues
def fetch_and_process_issues():
    page = 1
    issues_data = []
    total_requests = 0  # Track the number of requests made

    while True:
        # Fetch issues from GitHub API
        response = requests.get(issues_url, params={"page": page, "per_page": 100}, headers=headers)
        total_requests += 1

        if response.status_code != 200:
            print(f"Failed to fetch issues. Status code: {response.status_code}")
            break

        issues = response.json()
        if not issues:
            break  # No more issues

        for issue in issues:
            issue_id = issue["id"]
            title = issue["title"]
            state = issue["state"]
            first_message = process_message(issue.get("body", ""))
            messages = first_message  # Start with the first message

            # Fetch comments for the issue
            comments_url = issue["comments_url"]
            comments_response = requests.get(comments_url, headers=headers)
            total_requests += 1

            if comments_response.status_code == 200:
                comments = comments_response.json()
                filtered_comments = []

                for comment in comments:
                    if "bot" not in comment["user"]["login"]:  # Skip bot messages
                        filtered_comments.append(process_message(comment["body"]))

                if filtered_comments:
                    messages += "\n---\n".join(filtered_comments)

            # If only the initial message is present (or no meaningful comments), mark as "no reaction"
            if not messages.strip():
                state = "no reaction"

            issues_data.append({
                "title": title,
                "id": issue_id,
                "state": state, 
                "first": first_message,
                "messages": messages,
            })

        page += 1  # Go to the next page

    # Fetch rate limit info
    rate_limit_response = requests.get(rate_limit_url, headers=headers)
    total_requests += 1

    if rate_limit_response.status_code == 200:
        remaining_requests = rate_limit_response.json()["rate"]["remaining"]
    else:
        print(f"Failed to check rate limit. Status code: {rate_limit_response.status_code}")
        remaining_requests = None  # If unable to fetch rate limit info

    return issues_data, total_requests, remaining_requests

# Check if user wants JSON output
if __name__ == "__main__":
    issues_data, total_requests, remaining_requests = fetch_and_process_issues()

    if "--output" in sys.argv and "json" in sys.argv:
        print(json.dumps(issues_data, indent=2))
    else:
        with open("issues.json", "w") as outfile:
            json.dump(issues_data, outfile, indent=4)

        print(f"Total Requests Made: {total_requests}")
        print(f"Remaining Requests: {remaining_requests if remaining_requests is not None else 'Could not fetch remaining requests'}")
