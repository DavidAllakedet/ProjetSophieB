// Fonction pour gérer la soumission du formulaire de connexion
function handleLoginSubmit(event) {
    event.preventDefault();
    const emailValue = document.querySelector("#email").value;
    const passwordValue = document.querySelector("#password").value;

    async function loginFetch() {
        const promise = await fetch("http://localhost:5678/api/users/login", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: emailValue,
                password: passwordValue
            })
        });

        if (promise.ok === true) {
            const response = await promise.json();
            const token = response.token;
            localStorage.setItem("mon_token", token);
            window.location.href = "/index.html";
        } else {
            alert("Erreur dans l'identifiant ou le mot de passe");
            throw new Error("Erreur dans l’identifiant ou le mot de passe");
        }
    }

    loginFetch();
}


// Fonction pour gérer la déconnexion
function deconnexion() {
    localStorage.removeItem("mon_token");
    // Vérifier si la page actuelle est index.html
    if (window.location.pathname.includes("index.html")) {
        // Rediriger l'utilisateur vers la page de connexion (login.html)
        window.location.href = "/login.html";
    } else {
        // Sinon, recharger simplement la page actuelle (pour mettre à jour le bouton)
        window.location.reload();
    }
}

// Fonction pour vérifier l'état de connexion
function EtatConnexion() {
    const loginButton = document.getElementById("loginButton");
    const logoutButton = document.getElementById("logoutButton");

    if (localStorage.getItem("mon_token")) {
        // L'utilisateur est connecté, masquer le bouton "Se connecter" et afficher le bouton "Se déconnecter"
        loginButton.style.display = "none";
        logoutButton.style.display = "block";
    } else {
        //  si l'utilisateur n'est pas connecté, masquer le bouton "Se déconnecter" et afficher le bouton "Se connecter"
        logoutButton.style.display = "none";
        loginButton.style.display = "block";
    }
}

// Ajout gestionnaires d'événements aux formulaires et boutons de déconnexion
const loginForm = document.querySelector("#login-form");
const logoutButton = document.getElementById("logoutButton");

if (loginForm) {
    loginForm.addEventListener("submit", handleLoginSubmit);
}

if (logoutButton) {
    logoutButton.addEventListener("click", deconnexion);
}

// Vérifie l'état de la connexion lors du chargement de la page
EtatConnexion();