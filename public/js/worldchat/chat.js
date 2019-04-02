app.controller('worldchat', function($scope, $http, $window) {
  $scope.message;
  $scope.messages = [];
  $scope.users = [];
  $scope.glued = true;

  let id_user = angular.element('.userinfo')[0].id;
  let socket = io.connect('localhost');


  $http.get('worldchat/getMessages').then((response) => {
    if (response.data === {}) return;
    if (response.data.messages.length === undefined) return;
    for (let i = 0; i < response.data.messages.length; i++) {
      let me = (id_user == response.data.messages[i].id_user ? true : false);
      $scope.messages.push({
        username: response.data.messages[i].username,
        message: response.data.messages[i].message,
        id_message: response.data.messages[i].id_message,
        created_at: response.data.messages[i].created_at,
        myself: me,
        img_url: response.data.messages[i].img_url,
      });
    }
  }).catch((err) => console.error(err));


  socket.on('add user', (users) => {
    $scope.users = users;

    $scope.$apply();
  });

  socket.on('remove user', (users) => {
    $scope.users = users;

    $scope.$apply();
  });

  socket.on('echo', (data) => {
    let me = (id_user == data.id_user ? true : false);

    $scope.messages.push({
      username: data.username,
      message: data.message,
      created_at: data.created_at,
      img_url: data.img_url,
      id_message: data.id_message,
      myself: me,
    });
    console.log($scope.messages);

    $scope.$apply();
  });

  $scope.sendMsg = () => {
    let message = $scope.message;

    $http.post('worldchat/sendMessage', {message: message}).then((response) => {
      console.log(response);
      $scope.message = '';
    }).catch((err) => console.error(err));

    angular.element('#m').val('');
  };
});


$('.hide-chat-box').click(function() {
  $('.chat-content').slideToggle();
});

