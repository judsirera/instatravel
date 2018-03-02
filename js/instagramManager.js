var instagramManager = {
  _TOKEN: "instatravel_token",
  _USERNAME: "instatravel_username",

  username: "",
  token: "",


  client_id: "37ef44c599b5494480e90749c720eb7f",
  redirect_uri: 'https://judsirera.github.io/instatravel/login/',
  requestApi: 'https://api.instagram.com/v1/users/self/?access_token=',
  type: "GET",

  requestCurrentUser: function () {
    var xhr = new XMLHttpRequest();

    xhr.open(this.type, this.requestApi + this.token)
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        // JSON.parse does not evaluate the attacker's scripts.
        var resp = JSON.parse(xhr.responseText);
        instagramManager.username = resp.data.username;
        localStorage.setItem(instagramManager._USERNAME, instagramManager.username);

        firebaseManager.getData();
      }

    }
    xhr.send();
  },

  userAuthentication: function () {
    if (localStorage.getItem(this._USERNAME)) {
      this.username = localStorage.getItem(this._USERNAME);
      this.token = localStorage.getItem(this._TOKEN);
      this.addLogoutListener();
    } else if (localStorage.getItem(this._TOKEN)){
      this.token = localStorage.getItem(this._TOKEN);
      this.requestCurrentUser();
      this.addLogoutListener();
    } else {
      var url = "https://api.instagram.com/oauth/authorize/?client_id=" + this.client_id + "&redirect_uri=" + this.redirect_uri + "&response_type=token";
      window.location.replace(url);
    }
  },

  addLogoutListener: function () {
    $( ".logout" ).click(function () {
      localStorage.removeItem(instagramManager._TOKEN);
      localStorage.removeItem(instagramManager._USERNAME);
      window.location.reload();
    })
  }
}
