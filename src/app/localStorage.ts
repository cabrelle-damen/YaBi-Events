const userData = {
    username: 'exampleUser',
    roles: ['admin', 'manage-users'] // Tableau contenant les rôles de l'utilisateur
  };
  localStorage.setItem('LoginData', JSON.stringify(userData));
  