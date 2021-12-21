# Requirements tochtknop
- Twee knoppen tochten en stop het tochten
- rate limiter op basis van ip adres
de allersnelste mensen kunnen 15.4 clicks per seconde doen, ik zelf 6.6 clicks per seconde dat is ook ongeveer het gemiddelde 
maximaal 120 clicks per 10s https://cpstest.onl/
- algoritme 
1. naar mate de tijd vordert wordt het tochten ietsje makkelijker. 
y=0.0000717774*x^1.6+1
expentiele functie met cap op 10 minuten dan is voor tochten 3x zo makkelijk als tegen tochten
2. naarmate er meer mensen meedoen moet er vaker geklikt worden om een voorstel getocht te krijgen. 
De limiet wordt hoger. We beginnen bij 500, voor een ieder die meedoet komen er 50 clicks bij. 
3. Als er 5-7s niet geclickt wordt de toch afgebroken en moet er opnieuw begonnen worden. 

- indicator bar die aangeeft hoever het tochten gevorderd is die naast voorstel wordt getoond.

api

/vote?type=yeah,nays
call
/status
call / stream

frontend
knoppen voor voor stemmen en tegen
balk die van 0 - 100 (getocht)

redis (memory database)


overal_counter (totaal geclickt tijdens congres)

per stemming de stand 
/vote?type=yes
+ y=0.0000717774*x^1.6+1
1
/vote?type=no
0
/vote?type=yes
/vote?type=yes
/vote?type=yes
/vote?type=yes
4




per stemming het aantal deelnemers bij


