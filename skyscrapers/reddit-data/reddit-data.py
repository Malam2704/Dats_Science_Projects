import requests

# Set a custom User-Agent to comply with Reddit API guidelines
headers = {'User-Agent': 'MyRedditApp/1.0 (by u/your_username)'}

# Define the endpoint and parameters
url = 'https://www.reddit.com/r/skyscrapers/top.json'
params = {'limit': 100, 't': 'month'}  # Change 't' as needed

# Make the GET request
response = requests.get(url, headers=headers, params=params)

# Check if the request was successful
if response.status_code == 200:
    data = response.json()
    # Iterate through the posts
    for post in data['data']['children']:
        title = post['data']['title']
        print(title)
else:
    print("Error:", response.status_code)
