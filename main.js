document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.querySelector('.burger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const header = document.querySelector('header');

    function updateMenuPosition() {
        if (header) {
            const headerHeight = header.offsetHeight;
            mobileMenu.style.top = headerHeight + 'px';
        }
    }

    // Mettre à jour la position au chargement et au redimensionnement
    updateMenuPosition();
    window.addEventListener('resize', updateMenuPosition);

    burgerMenu.addEventListener('click', function() {
        burgerMenu.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Fermer le menu quand on clique sur un lien
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            burgerMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });

    // Fermer le menu quand on clique en dehors
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = mobileMenu.contains(event.target);
        const isClickOnBurger = burgerMenu.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnBurger && mobileMenu.classList.contains('active')) {
            burgerMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });
});

const mailSender = () =>  {
    const mail = {
        client_name: document.getElementById('name').value,
        client_company: document.getElementById('company').value,
        client_mail: document.getElementById('mail').value,
        client_tel: document.getElementById('tel').value,
        client_dispo: document.getElementById('dispo').value,
        mail_object: document.getElementById('object').value,
        mail_msg: document.getElementById('msg').value,
        contact_tel: document.getElementById('r-tel').value,
        contact_mail: document.getElementById('r-mail').value,
        contact_visio: document.getElementById('r-visio').value
    }

    console.log(mail)
    sendMail(mail)

}

const setMailObject = (object) => {
    document.getElementById('object').innerText = object
    console.log(object)
}

const sendMail = (mail) => {
    const url = "http://localhost:3000";
    const data = {
        subject: mail.mail_object,
        text: `Nom du contact : ` + mail.client_name +
              `Entreprise : ` + mail.client_company +
              `Mail du contact : ` + mail.client_mail +
              `Tel. du contact : ` + mail.client_tel +
              
              `Disponibilités : ` + mail.client_dispo + 
              `Souhaite être recontacté.e par :` +
                    `Téléphone : ` + mail.contact_tel? 'Oui' : 'Non' +
                    `Mail : ` + mail.contact_mail? 'Oui' : 'Non' +
                    `Visio : ` + mail.contact_visio? 'Oui' : 'Non' +

              `Message : ` 

              + mail.mail_msg
    };

    fetch(url + '/send', {
        method: "POST",
        headers: {
            "Content-Type": "application/json" // On envoie du JSON
        },
        body: JSON.stringify(data) // Conversion de l'objet JS en JSON
    })
    .then(response => response.json()) // On convertit la réponse en JSON
    .then(result => {
        console.log("Réponse du serveur :", result);
    })
    .catch(error => {
        console.error("Erreur :", error);
    });
}