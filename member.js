function skillsMember() {
    return {
        restrict: 'E',
        templateUrl: 'templates/skills/views/member.html',
        controller: 'skillsMemberController',
        controllerAs: 'vm',
        bindToController: true,
        scope: {
            member: '='
        }        
    };
}