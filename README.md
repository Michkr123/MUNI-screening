# ICS MUNI screening

## Popis

Tato úloha je vypracována v rámci screeningu ICS MUNI na pozici React vývojář.
Skript issuer.py stáhne a naformátuje všechny otevřené i zavřené problémy, naformátuje je a uloží do .json souboru dle zadání (viz zadani.pdf).

Data issues z GitHub repozitáře cloudnative-pg účtu cloudnative-pg jsou již stažena. Není třeba skript pro spuštění stránky znovu stahovat.
Pro ověření funkčnosti skriptu je však možné ho spustit s návodem níže, prosím držte se návodu a nastavte si váš github token. 
Bez jeho nastavení budete omezeni na 50 requestů na GitHub API, to v tomto skriptu například na issues repozitáře cloudnative-pg nestačí.
Prosím mějte strpení, na mém zařízení a internetu běžel skript 6 minut a 30 sekund. Pro rychlejší běh lze zvolit jiný repozitář s méne issues. 

Věřím, žep jsou návody kompletní a vše poběží v pořádku, pokud by nastaly komplikace, neváhejte se ozvat. 

## Návod na spuštění skriptu

```
pip3 install -r requirements.txt
export GITHUB_TOKEN="VAS_TOKEN"
python3 issuer.py
```

## Návod na spuštění webu

Navigujte se do složky issue-visualizer a proveďte:
```
npm install
```

### Back-end

```
npm run server
```
Toto spustí server, který slouží pro fetchování dat ze souboru issues.json  

### Front-end

```
nvm install 22
npm run dev
```

## Zdroje
### Python skript
https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api?apiVersion=2022-11-28
https://stackoverflow.com/questions/17622439/how-to-use-github-api-token-in-python-for-requesting
https://www.merge.dev/blog/get-all-issues-github-api-python

### Back-end
https://dev.to/codewithshahan/your-first-backend-application-using-nodejs-45i

### Front-end
https://tailwindcss.com/docs/installation/using-postcss

#### MUI prvky
https://mui.com/material-ui/react-tabs/
https://mui.com/material-ui/react-pagination/
https://mui.com/material-ui/react-select/