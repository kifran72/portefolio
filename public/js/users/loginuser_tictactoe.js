
app.controller('loginUser_tictactoe', ($scope, $http, $window, $timeout) => {
  let username;
  let password;
  $scope.connect = false;
  $scope.incorrect = false;
  $scope.username, $scope.password;
  $scope.strongMessage = '';
  $scope.message = '';
  $scope.type = '';
  $scope.alert = false;
  $scope.spinner = false;


  $scope.getAlert = (type, strongMessage, message) => {
    $scope.type = type;
    $scope.strongMessage = strongMessage;
    $scope.message = message;
    $scope.alert = true;
    $timeout(() => {
      $scope.alert = false;
    }, 3000);
  };


  // Création de la fonction loginUser pour permmettre l'envoie du username et password par la route crée "/login"
  // et si la reponse de la route est true rediriger vers "/" sinon message d'erreur
  $scope.loginUser = () => {
    username = $scope.username;
    password = $scope.password;
    $http.post('/login', {
      username: username,
      password: password,
    }).then((rep) => {
      if (rep.data.success) {
        $scope.getAlert('success', 'Succes !', 'Connexion en cours...');
        $scope.spinner = true;
        $timeout(() => {
          $scope.spinner = false;
          $window.location.href = '/tictactoe';
        }, 2000);
      } else {
        if (username === undefined && password === undefined) {
          $scope.getAlert('warning', 'Attention !', 'Tous les champs doivent être remplis');
        } else {
          $scope.getAlert('danger', 'Erreur !', 'Les informations entrées sont incorrects');
        }
      }
    });
  };
});

