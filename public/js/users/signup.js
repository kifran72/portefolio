app.controller('signup', function($scope, $http, $window, $timeout) {
  $scope.mail, $scope.username, $scope.password, $scope.passwordTest;
  let mail;
  let username;
  let password;
  let passwordTest;
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


  $scope.signup = function() {
    mail = $scope.mail;
    username = $scope.username;
    password = $scope.password;
    passwordTest = $scope.passwordTest;


    if (mail === undefined && username === undefined && password === undefined && passwordTest === undefined) {
      $scope.getAlert('warning', 'Attention !', 'Tous les champs doivent être remplis');
    } else if (passwordTest != password) {
      $scope.password = '';
      $scope.passwordTest = '';
      $scope.getAlert('warning', 'Attention !', 'Les mot de passe ne sont pas identiques');
    } else {
      $scope.spinner = true;

      $http.post('/signup', {
        mail: mail,
        username: username,
        password: password,
      }).then((rep) => {
        console.log(rep);
        if (rep.data.success) {
          $scope.getAlert('success', 'Succes !', 'Vous pouvez vous connecter');
          $scope.spinner = true;
          $timeout(() => {
            $scope.spinner = false;
            $window.location.href = '/login';
          }, 2000);
        } else {
          $scope.getAlert('warning', 'Attention !', 'Pseudo ' + rep.data.username + ' déja existant !');
        }
      }).catch((err) => console.log(err));
    }
  };

  $scope.logout = () => {
    $window.location.href = '/worldchat';
  };
});

