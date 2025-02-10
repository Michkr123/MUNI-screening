import requests
import time

# GitHub API rate limit URL
rate_limit_url = 'https://api.github.com/rate_limit'

# Your GitHub personal access token
token = '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'  # Replace with your actual token

# Set the headers, including the Authorization with your token
headers = {
    'Authorization': f'token {token}',
    'User-Agent': 'Michkr123'  # Optional, replace with your GitHub username or app name
}

# Make the API request to check the rate limit
response = requests.get(rate_limit_url, headers=headers)

# Check if the request was successful
if response.status_code == 200:
    rate_limit_info = response.json()
    remaining_requests = rate_limit_info['resources']['core']['remaining']
    reset_time = rate_limit_info['resources']['core']['reset']
    
    print(f"Remaining requests: {remaining_requests}")
    
    # If no requests are left, show when the limit will reset
    if remaining_requests == 0:
        reset_timestamp = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(reset_time))
        print(f"Rate limit exceeded. Limit will reset at {reset_timestamp}.")
else:
    print(f"Failed to check rate limit. Status code: {response.status_code}")
