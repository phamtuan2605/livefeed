(function (angular) {
    function sessionService($log, localStorage) {

        // Instantiate data when service
        // is loaded
        var th = this;
        th._user = JSON.parse(localStorage.getItem('session.user'));

        th.getUser = function () {
            return this._user;
        };

        th.setUser = function (user) {
            th._user = user;
            localStorage.setItem('session.user', JSON.stringify(user));
            return th;
        };

        th.getUserId = function () {
            if(th._user!=null)
                return th._user.userId;
            else return 0;
        };
        th.getUserName = function () {
            if(th._user!=null)
                return th._user.name;
            else return '';
        };
        /**
         * Destroy session
         */
        th.destroy = function destroy() {
            th.setUser(null);
        };


        th.logout = function () {
            th.setUser(null);
        };

    }

    // Inject dependencies
    sessionService.$inject = ['$log', 'localStorage'];

    // Export
    angular
      .module('mkTweet')
      .service('Auth', sessionService);
})(angular);




