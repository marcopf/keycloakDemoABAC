import os
import shutil
import json

# Directory containing files
directory_path = "./policies"

# Load the structure of the file to be copied
with open('META-INF/keycloak-scripts.json', 'r') as f:
    structure = json.load(f)

# List files in the directory
files = [file for file in os.listdir(directory_path) if file.endswith('.js')]
structure['policies'] = [];
# Loop through each file and add entry in policies
for file_name in files:
    policy_entry = {
        "name": os.path.splitext(file_name)[0],  # Remove extension for name
        "fileName": file_name,
        "description": "policy Description"
    }
    structure['policies'].append(policy_entry)


# Write the updated structure to a new file
with open('META-INF/keycloak-scripts.json', 'w') as f:
    json.dump(structure, f, indent=2)