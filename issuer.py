import requests
import json
import sys
import re
import os

# GitHub repository
owner = "cloudnative-pg"
name = "cloudnative-pg"

issues_url = f"https://api.github.com/repos/{owner}/{name}/issues"

# Needed for increasing GitHub API request from 50 to 5000  
token = os.getenv("GITHUB_TOKEN")
if not token:
    print("Set your GitHub token: export GITHUB_TOKEN=\"YOUR_TOKEN\".")
    sys.exit(1)

headers = {
    "Authorization": f"token {token}",
    "User-Agent": "issuer",
}

# Formating for task 1 
def process_message(message):
    """Cleans up and formats message text."""
    if not message or not message.strip():
        return ""
    return re.sub(r'\n\s*\n+', '\n', message.strip())

def fetch_comments(session, comments_url):
    """Fetches comments for an issue."""
    comments = []
    page = 1
    while True:
        try:
            response = session.get(comments_url, params={"page": page, "per_page": 100}, headers=headers, timeout=30)
            response.raise_for_status()
            page_comments = response.json()

            if not page_comments:
                break

            for comment in page_comments:
                if "bot" not in comment["user"]["login"]:
                    comments.append(process_message(comment["body"]))

            if len(page_comments) < 100:
                break
            page += 1
        except requests.exceptions.RequestException as e:
            print(f"Error fetching comments: {e}")
            break
    return comments

def fetch_and_process_issues():
    """Fetches all issues (open and closed), processes comments, and outputs formatted JSON."""
    page = 1
    issues_data = []

    with requests.Session() as session:
        session.headers.update(headers)

        while page:
            try:
                response = session.get(
                    issues_url,
                    params={"page": page, "per_page": 100, "state": "all"},
                    timeout=30
                )

                if response.status_code != 200:
                    print(f"Failed to fetch issues. Status code: {response.status_code}")
                    break

                issues = response.json()
                if not issues:
                    break

                for issue in issues:
                    if "pull_request" in issue:
                        continue

                    issue_id = issue["id"]
                    title = issue["title"]
                    state = issue["state"]

                    first_message = process_message(issue.get("body", ""))
                    messages = first_message  

                    if issue["comments"] > 0:
                        comments_url = issue["comments_url"]
                        comments = fetch_comments(session, comments_url)
                        if comments:
                            messages += "\n---\n" + "\n---\n".join(comments)

                    if first_message == messages:
                        state = "no reaction"

                    issues_data.append({
                        "title": title,
                        "id": issue_id,
                        "state": state, 
                        "first": first_message,
                        "messages": messages,
                    })
                page += 1  
            except requests.exceptions.RequestException as e:
                print(f"Error while fetching issues: {e}")
                break

    return issues_data

if __name__ == "__main__":
    issues_data = fetch_and_process_issues()

    if "--output" in sys.argv and "json" in sys.argv:
        print(json.dumps(issues_data, indent=2))
    else:
        with open("issues.json", "w") as outfile:
            json.dump(issues_data, outfile, indent=4)