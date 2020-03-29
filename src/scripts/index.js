

(function() {
  /**
   *
   * @Cookies{Object} RESPONSIBLE FOR IMPLEMENTING THE COOKIES FUNCTIONALITIES
   * holds all the function that implements the create,retrieve and  clear cookies
   * @{eo} @{iamkate}
   */
  const Cookies = {
    set: function(b, c, a) {
      b = [encodeURIComponent(b) + '=' + encodeURIComponent(c)];
      a &&
        ('expiry' in a &&
          ('number' == typeof a.expiry &&
            (a.expiry = new Date(1e3 * a.expiry + +new Date())),
          b.push('expires=' + a.expiry.toGMTString())),
        'domain' in a && b.push('domain=' + a.domain),
        'path' in a && b.push('path=' + a.path),
        'secure' in a && a.secure && b.push('secure'));
      document.cookie = b.join('; ');
    },
    get: function(b, c) {
      for (
        var a = [], e = document.cookie.split(/; */), d = 0;
        d < e.length;
        d++
      ) {
        var f = e[d].split('=');
        f[0] == encodeURIComponent(b) &&
          a.push(decodeURIComponent(f[1].replace(/\+/g, '%20')));
      }
      return c ? a : a[0];
    },
    clear: function(b, c) {
      c || (c = {});
      c.expiry = -86400;
      this.set(b, '', c);
    }
  };
  Object.freeze(Cookies);

  /**
   *
   *
   * @function{*} Handles The Cookies Implementation
   */
  const CookiesSection = () => {
    /**
     *
     * @event{*} the functions and operations inside this document
     * event gets executed ones the Dom has successully loaded
     */
    document.addEventListener('DOMContentLoaded', () => {
      const form = document.querySelector('.cookiesForm');
      const okBtn = document.querySelector('.okBtn');
      const cookies = document.querySelector('.cookies');
      /**
       *
       * @function{*} Responsible for Saving Cookies
       */

      okBtn.addEventListener('click', () => {
        cookies.classList.toggle('hideOkBtn');

        const saveCookies = () => {
          form.saveCookies.addEventListener('click', e => {
            e.preventDefault();

            const dataCollection = {
              userName: form.userName.value,
              userAge: Number(form.userAge.value)
            };
            const date = new Date(3030, 0, 1);

            /**Now I am setting the @object{dataCollection} into the cookie store*/
            const getUserName = Cookies.get('userName');
            const getUserAge = Cookies.get('userAge');
            if (
              dataCollection.userName !== getUserName &&
              dataCollection.userAge !== getUserAge
            ) {
              Cookies.set('userName', dataCollection.userName, {
                expiry: date,
                path: '/'
              });
              Cookies.set('userAge', dataCollection.userAge, {
                expiry: date,
                path: '/'
              });
              console.log('Saved To Cookies Sucessfully');

              form.reset();
            }
          });
        };

        saveCookies();
      });

      /**
       *
       * @function{*} Responsible for Getting Cookies
       */
      const getCookies = () => {
        form.loadCookies.addEventListener('click', e => {
          e.preventDefault();
          const getUserName = Cookies.get('userName');
          const getUserAge = Cookies.get('userAge');

          form.userName.value = getUserName;
          form.userAge.value = getUserAge;
        });
      };
      getCookies();

      /**
       *
       * @function{*} Responsible for Clearing Cookies
       */
      const clearCookies = () => {
        const clearCookiesBtn = document.querySelector('.clearCookiesBtn');

        clearCookiesBtn.addEventListener('click', () => {
          console.log('Testing');
          Cookies.clear('userName', { path: '/' });
          Cookies.clear('userAge', { path: '/' });
        });
      };
      clearCookies();
    });
  };
  CookiesSection();
  /**End of Cookies Implementation */

  /***
   *Begining of Local Storage Implementation
   *
   * @Local Storage{Construction} The below code base is
   * for construction the functionalities of local storage
   */
  function $LocalStorage() {
    if (!new.target) {
      return $LocalStorage;
    }
    this._set = _set;
    this._get = _get;
    this.remove = _remove;
    this._clear = _clear;
  }

  function _set(name, val) {
    return localStorage.setItem(name, val);
  }

  function _get(name) {
    return localStorage.getItem(name);
  }

  function _remove(name) {
    return localStorage.removeItem(name);
  }

  function _clear() {
    return localStorage.clear();
  }

  /**
   *
   *
   * @function{*} Handles The Local Storage Implementation
   */
  const LocalStorageSection = () => {
    /**
     *
     * @event{*} the functions and operations inside this document
     * event gets executed ones the Dom has successully loaded
     */
    document.addEventListener('DOMContentLoaded', () => {
      const form = document.querySelector('.localStorageForm');

      /**The code is actually the execution of contructional function....
       * People call it constructor instatiation,class instatiation */
      const $localStorage = new $LocalStorage();

      /**
       *
       * @function{} THE BELOW FUNCTION IS RESPONSIBLE FOR SAVING DATA TO LOCAL STORAGE
       */
      const saveToLocalStorage = () => {
        form.saveToLocalStorage.addEventListener('click', e => {
          e.preventDefault();
          const dataCollection = {
            userName: form.userName.value,
            userAge: form.userAge.value
          };

          $localStorage._set('userName', dataCollection.userName);
          $localStorage._set('userAge', dataCollection.userAge);

          console.log('****SAVED TO LOCAL STORAGE SUCCESSFULLY****');
        });
      };
      saveToLocalStorage();

      /**
       *
       * @function{} THE BELOW FUNCTION IS RESPONSIBLE FOR GETTING DATA FROM LOCAL STORAGE
       */
      const getFromLocalStorage = () => {
        form.loadFromLocalStorage.addEventListener('click', e => {
          e.preventDefault();
          form.userName.value = $localStorage._get('userName');
          form.userAge.value = $localStorage._get('userAge');

          console.log($localStorage._get('userAge'));
        });
      };
      getFromLocalStorage();

      /**
       *
       * @function{} THE BELOW FUNCTION IS RESPONSIBLE FOR CLEARING LOCAL STORAGE
       */
      const clearLocalStorage = () => {
        const clearLocalStorageBtn = document.querySelector(
          '.clearLocalStorageBtn'
        );

        clearLocalStorageBtn.addEventListener('click', () => {
          $localStorage.clear();
        });
      };
      clearLocalStorage();
    });
  };
  LocalStorageSection();
})();