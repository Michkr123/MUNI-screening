# ICS MUNI screening (Python GitHub Issues API client + React/Typescript visualizer)

## Description

This role is developed as part of the ICS MUNI screening for the position of React developer.
The script issuer.py is a scraper that downloads and formats all open and closed issues from the Gihub repository, formats them and saves them in a .json file as specified (see zadani.pdf).

Issue data from the GitHub repository of the cloudnative-pg account cloudnative-pg is already downloaded. There is no need to re-download the script to run the page.
However, to test the functionality of the script, you can run it with the instructions below, please follow the instructions and set up your github token. 
Without setting it up you will be limited to 50 requests to the GitHub API, this is not enough in this script for the cloudnative-pg repository issues for example.
Please be patient, on my device and internet the script ran for 6 minutes and 30 seconds. For a faster run you can choose another repository with less issues. 

I trust that the instructions are complete and everything will run fine, if there are complications, please do not hesitate to get in touch. 

## Instructions for running the script

```
pip3 install -r requirements.txt
export GITHUB_TOKEN="VAS_TOKEN"
python3 issuer.py
```

## Instructions for running the site

Navigate to the issue-visualizer folder and execute:
```
npm install
```

### Back-end

```
npm run server
```
This will start the server that is used to fetch data from the issues file. json 

## Front-end

```
nvm install 22
npm run dev
```

If you don't have nvm, you can find its installation here:
https://github.com/nvm-sh/nvm

## Resources
### Python script
https://docs.github. com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api?apiVersion=2022-11-28
https://stackoverflow.com/questions/17622439/how-to-use-github-api-token-in-python-for-requesting
https://www.merge.dev/blog/get-all-issues-github-api-python

## Back-end
https://dev.to/codewithshahan/your-first-backend-application-using-nodejs-45i

## Front-end
https://tailwindcss.com/docs/installation/using-postcss

#### MUI elements
https://mui.com/material-ui/react-tabs/
https://mui.com/material-ui/react-pagination/
https://mui.com/material-ui/react-select/
