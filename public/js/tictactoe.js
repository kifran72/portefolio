/* eslint-disable require-jsdoc */
function estValide(button) {
  return button.innerHTML.length == 0;
}

function setSymbol(btn, symbole) {
  btn.innerHTML = symbole;
}

function rechercherVainqueur(pions, joueurs, tour) {
  if (pions[0].innerHTML == joueurs[tour] &&
         pions[1].innerHTML == joueurs[tour] &&
         pions[2].innerHTML == joueurs[tour]) {
    pions[0].style.backgroundColor = '#5CB85C';
    pions[1].style.backgroundColor = '#5CB85C';
    pions[2].style.backgroundColor = '#5CB85C';
    return true;
  }

  if (pions[3].innerHTML == joueurs[tour] &&
          pions[4].innerHTML == joueurs[tour] &&
          pions[5].innerHTML == joueurs[tour]) {
    pions[3].style.backgroundColor = '#5CB85C';
    pions[4].style.backgroundColor = '#5CB85C';
    pions[5].style.backgroundColor = '#5CB85C';
    return true;
  }

  if (pions[6].innerHTML == joueurs[tour] &&
          pions[7].innerHTML == joueurs[tour] &&
          pions[8].innerHTML == joueurs[tour]) {
    pions[6].style.backgroundColor = '#5CB85C';
    pions[7].style.backgroundColor = '#5CB85C';
    pions[8].style.backgroundColor = '#5CB85C';
    return true;
  }

  if (pions[0].innerHTML == joueurs[tour] &&
          pions[3].innerHTML == joueurs[tour] &&
          pions[6].innerHTML == joueurs[tour]) {
    pions[0].style.backgroundColor = '#5CB85C';
    pions[3].style.backgroundColor = '#5CB85C';
    pions[6].style.backgroundColor = '#5CB85C';
    return true;
  }

  if (pions[1].innerHTML == joueurs[tour] &&
          pions[4].innerHTML == joueurs[tour] &&
          pions[7].innerHTML == joueurs[tour]) {
    pions[1].style.backgroundColor = '#5CB85C';
    pions[4].style.backgroundColor = '#5CB85C';
    pions[7].style.backgroundColor = '#5CB85C';
    return true;
  }

  if (pions[2].innerHTML == joueurs[tour] &&
          pions[5].innerHTML == joueurs[tour] &&
          pions[8].innerHTML == joueurs[tour]) {
    pions[2].style.backgroundColor = '#5CB85C';
    pions[5].style.backgroundColor = '#5CB85C';
    pions[8].style.backgroundColor = '#5CB85C';
    return true;
  }

  if (pions[0].innerHTML == joueurs[tour] &&
          pions[4].innerHTML == joueurs[tour] &&
          pions[8].innerHTML == joueurs[tour]) {
    pions[0].style.backgroundColor = '#5CB85C';
    pions[4].style.backgroundColor = '#5CB85C';
    pions[8].style.backgroundColor = '#5CB85C';
    return true;
  }

  if (pions[2].innerHTML == joueurs[tour] &&
          pions[4].innerHTML == joueurs[tour] &&
          pions[6].innerHTML == joueurs[tour]) {
    pions[2].style.backgroundColor = '#5CB85C';
    pions[4].style.backgroundColor = '#5CB85C';
    pions[6].style.backgroundColor = '#5CB85C';
    return true;
  }
}

function matchNul(pions) {
  for (let i = 0, len = pions.length; i < len; i++) {
    if (pions[i].innerHTML.length == 0) {
      return false;
    }
  }

  return true;
}

let Afficheur = function(element) {
  let affichage = element;

  function setText(message) {
    affichage.innerHTML = message;
  }

  return {sendMessage: setText};
};

function main() {
  let pions = document.querySelectorAll('#Jeu button');
  let joueurs = ['X', 'O'];
  let tour = 0;
  let jeuEstFini = false;
  let afficheur = new Afficheur(document.querySelector('#StatutJeu'));
  afficheur.sendMessage('Le jeu peut commencer ! <br /> Joueur ' + joueurs[tour] + ' c\'est votre tour.');
  for (let i = 0, len = pions.length; i < len; i++) {
    pions[i].addEventListener('click', function() {
      if (jeuEstFini) {
        return;
      }

      if (!estValide(this)) {
        afficheur.sendMessage('Case occupée ! <br />Joueur ' + joueurs[tour] + ' c\'est toujours à vous !');
      } else {
        setSymbol(this, joueurs[tour]);
        jeuEstFini = rechercherVainqueur(pions, joueurs, tour);

        if (jeuEstFini) {
          afficheur.sendMessage('Le joueur ' + joueurs[tour] + ' a gagné ! <br /> <a href="/tictactoe-game">Rejouer</a>');
          return;
        }

        if (matchNul(pions)) {
          afficheur.sendMessage('Match Nul ! <br/> <a href="/tictactoe">Rejouer</a>');
          return;
        }

        tour++;
        tour = tour % 2;
        afficheur.sendMessage('Joueur ' + joueurs[tour] + ' c\'est à vous !');
      }
    });
  }
}

main();
