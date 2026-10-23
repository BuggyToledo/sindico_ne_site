# Fontes locais

`material-symbols-outlined-subset.woff2` é um **subconjunto** da fonte Material Symbols Outlined
(Google, licença Apache 2.0) contendo só os ícones usados no site (~60 KB em vez de ~3,9 MB).

Se um componente passar a usar um ícone novo, ele **não aparece** até a fonte ser regenerada:

```bash
# lista atual (ordem alfabética, separada por vírgula)
NOMES="account_balance_wallet,arrow_forward,arrow_right_alt,article,assignment,balance,bar_chart,calendar_today,call,chat,check_circle,construction,contact_support,corporate_fare,description,devices,domain,emergency,engineering,explore,feed,gavel,groups,handshake,location_on,lock,login,mail,menu_book,north_east,phone_iphone,pin_drop,policy,published_with_changes,savings,schedule,send,shield,shield_with_heart,star,support_agent,timer,trending_down,tune,verified,verified_user"
UA="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36"
URL=$(curl -s -A "$UA" "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=$NOMES&display=block" | grep -o 'https://[^)]*' | head -1)
curl -s "$URL" -o public/fonts/material-symbols-outlined-subset.woff2
```

O `npm run test:validate` avisa se algum ícone usado no código não estiver na lista acima.
