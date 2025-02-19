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
    # Open a file in write mode (this will create the file if it doesn't exist)
    with open("top_posts.txt", "w", encoding="utf-8") as file:
        # Iterate through the posts and write each title to the file
        for post in data['data']['children']:
            title = post['data']['title']
            file.write(title + "\n")
    print("Titles have been saved to top_posts.txt")
else:
    print("Error:", response.status_code)
