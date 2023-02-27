/**
 * @param {null|number} userId
 * @return {boolean}
 */
export const isAuthenticated = function (userId) {
   if(isNaN(userId)) {
       return false
   }
   return (userId > 0);
};