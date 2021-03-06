angular.module('proton.contact')
    .directive('contactView', ($rootScope, $stateParams, contactCache) => {
        const CONTACTS_EMPTY = 'contacts-empty';
        const CONTACTS_NO_RESULT = 'contacts-no-result';

        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl: 'templates/views/contacts.tpl.html',
            link(scope, element) {
                const unsubscribe = $rootScope.$on('contacts', (event, { type = '' }) => {
                    (type === 'contactsUpdated') && scope.$applyAsync(() => update());
                });

                function update() {
                    const contacts = contactCache.paginate(contactCache.get('filtered'));

                    element[0].classList.remove(CONTACTS_EMPTY, CONTACTS_NO_RESULT);
                    (!contacts.length && !$stateParams.keyword) && element[0].classList.add(CONTACTS_EMPTY);
                    (!contacts.length && $stateParams.keyword) && element[0].classList.add(CONTACTS_NO_RESULT);
                }

                update();

                scope.$on('$destroy', () => {
                    unsubscribe();
                });
            }
        };
    });
