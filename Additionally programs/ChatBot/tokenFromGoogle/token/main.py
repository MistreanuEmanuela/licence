from google.oauth2 import service_account
from google.auth.transport.requests import Request

# Path to your service account JSON file
credentials = service_account.Credentials.from_service_account_file(
    'chatbotproject-425609-ec9a94d2a7d3.json'
)

# Generate an OAuth 2.0 token
scoped_credentials = credentials.with_scopes(['https://www.googleapis.com/auth/cloud-platform'])
request = Request()
scoped_credentials.refresh(request)

# Print the access token
print(scoped_credentials.token)