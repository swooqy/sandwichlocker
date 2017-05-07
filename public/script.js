"use strict";

let user = null;

const messagesService = (function () {
    const DELAY = 5000;
    const form = document.querySelector('.message');
    form.querySelector('button').addEventListener('click', closeForm);

    function showMessage(message) {
        form.querySelector('p').textContent = message;
        form.removeAttribute('id');
        form.id = 'message';
        showForm();
    }

    function showWarning(warning) {
        form.querySelector('p').textContent = warning;
        form.removeAttribute('id');
        form.id = 'warning';
        showForm();
    }

    function showForm() {
        form.style.display = 'block';
        setTimeout(closeForm, DELAY);
    }

    function closeForm() {
        form.style.display = 'none';
    }

    return {
        showMessage,
        showWarning,
    }
})();

const requests = (function () {
    function makeQuery(filter) {
        let query = '';
        if (!filter) {
            return query;
        }
        const ownPropKeys = Object.keys(filter);
        ownPropKeys.forEach((item) => {
            const value = filter[item];
            query += `&${item}=${value}`;
        });
        return query;
    }

    function getArticles(skip, amount, filter) {
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();

            const load = (() => {
                req.removeEventListener('load', load);

                if (req.status === 200) {
                    const res = JSON.parse(req.responseText);
                    resolve(res);
                    return;
                }
                reject(Error('Articles not found!'));
            });

            const error = (() => {
                req.removeEventListener('error', error);
                reject('Articles not found!');
            });

            req.addEventListener('load', load);
            req.addEventListener('error', error);

            const url = `/articles?skip=${skip}&amount=${amount}${makeQuery(filter)}`;
            req.open('GET', url);
            req.send();
        });
    }

    function getArticle(id) {
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();

            const load = (() => {
                req.removeEventListener('load', load);
                if (req.status === 200) {
                    const res = JSON.parse(req.responseText);
                    resolve(res);
                }
                reject();
            });

            const error = (() => {
                req.removeEventListener('error', error);
                reject(Error('Pages not found!'));
            });

            req.addEventListener('load', load);
            req.addEventListener('error', error);

            req.open('GET', `/articles/${id}`);
            req.send();
        });
    }

    function putArticle(id, article) {
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();

            const load = (() => {
                req.removeEventListener('load', load);

                if (req.status === 200) {
                    resolve();
                    return;
                }
                reject(Error('Статьи не найдены'));
            });

            const error = (() => {
                req.removeEventListener('error', error);
                reject(Error('Статьи не найдены'));
            });

            req.addEventListener('load', load);
            req.addEventListener('error', error);

            req.open('PUT', `/article/${id}`);
            req.setRequestHeader('content-type', 'application/json');
            req.send(JSON.stringify(article));
        });
    }

    function postArticle(article) {
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();

            const load = (() => {
                req.removeEventListener('load', load);
                if (req.status === 200) {
                    resolve();
                    return;
                }
                reject(Error('Invalid article'));
            });

            const error = (() => {
                req.removeEventListener('error', error);
                reject(Error('Invalid article'));
            });

            req.addEventListener('load', load);
            req.addEventListener('error', error);

            req.open('POST', '/article');
            req.setRequestHeader('content-type', 'application/json');
            req.send(JSON.stringify(article));
        });
    }

    function deleteArticle(id) {
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();

            const load = () => {
                req.removeEventListener('load', load);
                if (req.status === 200) {
                    resolve();
                    return;
                }
                reject();
            };
            const error = (() => {
                req.removeEventListener('error', error);
                reject(Error('Статьи не найдены'));
            });

            req.addEventListener('load', load);
            req.addEventListener('error', error);

            req.open('DELETE', `/article/${id}`);
            req.send();
        });
    }

    function login(user) {
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();

            const load = (() => {
                req.removeEventListener('load', load);
                if (req.status === 200) {
                    resolve();
                    return;
                }
                reject();
            });

            const error = (() => {
                req.removeEventListener('error', error);
                reject();
            });

            req.addEventListener('load', load);
            req.addEventListener('error', error);

            req.open('POST', '/login');
            req.setRequestHeader('content-type', 'application/json');
            req.send(JSON.stringify(user));
        });
    }

    function logout() {
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();

            const load = (() => {
                req.removeEventListener('load', load);
                if (req.status === 200) {
                    resolve();
                    return;
                }
                reject();
            });

            const error = (() => {
                req.removeEventListener('error', error);
                reject();
            });

            req.addEventListener('load', load);
            req.addEventListener('error', error);

            req.open('GET', '/logout');
            req.send();
        });
    }

    function checkUser() {
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();

            const load = (() => {
                req.removeEventListener('load', load);
                if (req.status === 200) {
                    resolve(req.responseText);
                    return;
                }
                reject();
            });

            const error = (() => {
                req.removeEventListener('error', error);
                reject();
            });

            req.addEventListener('load', load);
            req.addEventListener('error', error);

            req.open('GET', '/user');
            req.send();
        });
    }

    function getAuthors() {
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();

            const load = (() => {
                req.removeEventListener('load', load);

                if (req.status === 200) {
                    const res = JSON.parse(req.responseText);
                    resolve(res);
                    return;
                }
                reject(Error('Articles not found!'));
            });

            const error = (() => {
                req.removeEventListener('error', error);
                reject(Error('Articles not found!'));
            });

            req.addEventListener('load', load);
            req.addEventListener('error', error);

            req.open('GET', '/authors');
            req.send();
        });
    }

    return {
        getArticle,
        getArticles,
        putArticle,
        postArticle,
        deleteArticle,
        login,
        logout,
        checkUser,
        getAuthors
    }
}());

const pageRenderer = (function () {
    const FORM = getById('loginformid');
    const ARTICLE_TEMPLATE = getByQuery('#template-article');
    const ARTICLE_LIST_NODE = getByQuery('.mainsection');
    $("#search-pannel").slideUp(1);

    function initAuthors(authors) {
        if (!authors || !authors.length) {
            return;
        }
        let list = '<option value="none">none</option>';
        const authsHtml = authors.map(a => '<option value="' + a + '">' + a + '</option>');
        list += authsHtml.join();
        const select = getByQuery(".search-authors-select")
        select.innerHTML = list;
    }

    function addArticlesInDom(articles) {
        if (!articles) return;
        const articlesNodes = articles.map(article => renderArticle(article));
        articlesNodes.forEach(node => ARTICLE_LIST_NODE.appendChild(node));
    }

    function removeArticlesFromDom() {
        ARTICLE_LIST_NODE.innerHTML = '';
    }

    function renderArticle(article) {
        const temp = ARTICLE_TEMPLATE.content;

        const id = article._id;
        const title = '<a data-type=\'more\' data-id="' + id + '">' + article.title + '</a>';
        const preview = '<p>' + article.summary + '</p>';
        const img = '<img src=' + article.img + '>';
        const data = new Date(article.createdAt);

        temp.querySelector('.news').dataset.id = id;
        temp.querySelector('.news-edit').dataset.id = id;
        temp.querySelector('.news-delete').dataset.id = id;
        temp.querySelector('.imagecontainer-link').dataset.id = id;
        temp.querySelector('.more').dataset.id = id;

        temp.querySelector('.article-title').innerHTML = title;
        temp.querySelector('.news-preview').innerHTML = preview;
        temp.querySelector('.username2').textContent = article.author;
        temp.querySelector('.imagecontainer').innerHTML = img;
        temp.querySelector('.news-dateposted-date').textContent = data;
        temp.querySelector('.news-edit').style.display = user ? 'inline' : 'none';
        temp.querySelector('.news-delete').style.display = user ? 'inline' : 'none';

        return temp.querySelector('.news').cloneNode(true);
    }

    function closeAllPages() {
        getByQuery(".error").style.display = 'none';
        getById("search-pannel").style.display = 'none';
        getById("page-main").style.display = 'none';
        getById("page-new").style.display = 'none';
        getById("page-edit").style.display = 'none';
        getById("page-login").style.display = 'none';
        getById("page-about").style.display = 'none';
        getById("page-full").style.display = 'none';
        getById('searchtoggle').style.display = 'none';
    }

    function openMainPage(articles) {
        closeAllPages();
        getById('page-main').style.display = 'block';
        getById('searchtoggle').style.display = 'inline';
        removeArticlesFromDom();

        if (user) {
            getByQuery('.login-info').innerHTML = 'Logged as<br><div class="username"> Log In</div>';
            getByQuery('.username').textContent = user;
            getByQuery("#add-news").style.display = 'inline';
            return;
        }

        getByQuery('.login-info').innerHTML = 'Please<br><div class="username"> Log In</div>';
        getByQuery("#add-news").style.display = 'none';
    }

    function updateArticleList(articles) {
        removeArticlesFromDom();
        addArticlesInDom(articles);
    }

    function openFullPage(article) {
        closeAllPages();
        getById("page-full").style.display = 'block';

        getByQuery('.news-editbox-full').style.display = user ? 'block' : 'none';

        if (!article) return;

        getByQuery('.full-edit').dataset.id = article.id;
        getByQuery('.full-delete').dataset.id = article.id;
        getByQuery('.fulltitle').textContent = article.title || '';
        getById('fullarticletext').textContent = article.content || '';
        getByQuery('.fullsubmitter').textContent = article.author || '';
        getByQuery('.dateposted-full').textContent = new Date(article.createdAt || Date.now());
        getByQuery('.imgcontainerfull').innerHTML = '<img src="' + (article.img || '') + '">';
    }

    function openAddForm() {
        closeAllPages();
        getById('page-new').style.display = 'block';

        const errs = getByClass('error-add');
        [].forEach.call(errs, n => n.style.display = 'none');

        getById('titlebox').value = '';
        getById('summary').value = '';
        getById('contentbox').value = '';
        getById('imgbox').value = '';
    }

    function openEditForm(article) {
        closeAllPages();
        getById('page-edit').style.display = 'block';

        if (!article) return;

        getById('titleboxedit').value = article.title || '';
        getById('summaryedit').value = article.summary || '';
        getById('contentboxedit').value = article.content || '';
        getById('imgboxedit').value = article.img || '';
        getById('id-edit-container').textContent = article._id || 123;
    }

    function openLoginForm() {
        FORM.login.value = '';
        FORM.password.value = '';
        closeAllPages();
        getById('page-login').style.display = 'block';
        getByQuery('.login-error').style.display = 'none';
    }

    function openAboutPage() {
        closeAllPages();
        getById("page-about").style.display = 'block';
    }

    function showFilterForm() {
        $("#search-pannel").slideToggle(1000);
    }

    return {
        initAuthors,
        openMainPage,
        updateArticleList,
        openFullPage,
        openAddForm,
        openEditForm,
        openLoginForm,
        openAboutPage,
        showFilterForm
    }
}());

const articleFormController = (function () {
    function error(message) {
        const errs = getByClass('error-add');
        [].forEach.call(errs, label => {
            label.textContent = message;
            label.style.display = 'block';
        });
    }

    function isValidArticle(article) {
        if (!article.title) {
            error("No Title Specified");
            return false;
        }
        if (article.title.length > 100) {
            error("Title is too long");
            return false;
        }
        if (!article.summary) {
            error("No Summary Specified");
            return false;
        }
        if (article.summary.length > 200) {
            error("Summary is too long");
            return false;
        }
        if (!article.content) {
            error("Content is not Specified");
            return false;
        }
        if (!article.img) {
            error("No Image Attached");
            return false;
        }
        return true;
    }

    function addArticle() {
        const article = {
            title: getById('titlebox').value,
            summary: getById('summary').value,
            content: getById('contentbox').value,
            img: getById('imgbox').value
        };

        if (isValidArticle(article)) {
            const pr = requests.postArticle(article);
            pr.then(articleService.showArticleListPage, messagesService.showWarning);
        }
    }

    function editArticle() {
        const article = {
            title: getById('titleboxedit').value,
            summary: getById('summaryedit').value,
            content: getById('contentboxedit').value,
            img: getById('imgboxedit').value
        };

        const id = getById('id-edit-container').textContent;

        if (isValidArticle(article)) {
            const pr = requests.putArticle(id, article);
            pr.then(articleService.showArticleListPage, messagesService.showWarning);
        }
    }

    return {
        addArticle,
        editArticle
    }
}());

const loginService = (function () {
    const FORM = getById('loginformid');

    function logout() {
        if (!user) return;

        const pr = requests.logout();
        pr.then(userLogout, messagesService.showWarning);
    }

    function userLogout() {
        user = null;
        messagesService.showMessage('User logout.');
        articleService.showArticleListPage();
    }

    function login() {
        if (user) return;

        const username = FORM.login.value.toLowerCase();
        const password = FORM.password.value.toLowerCase();

        if (isValid(username, password)) {
            const pr = requests.login({ username, password });
            pr.then(() => userIn(username), messagesService.showWarning);
        }
    }

    function userIn(username) {
        user = username;
        messagesService.showMessage(`Hello, ${user}`);
        articleService.showArticleListPage();
    }

    function isValid(login, password) {
        if (!login) {
            showErrorMessage('Login box is empty');
            return false;
        }
        if (login.length > 16) {
            showErrorMessage('Login is too long (16 char max)');
            return false;
        }
        if (!password) {
            showErrorMessage('Password box is empty');
            return false;
        }
        if (password.length > 16) {
            showErrorMessage('Password is too long (16 char max)');
            return false;
        }
        return true;
    }

    function showErrorMessage(input) {
        getByQuery('.login-error').style.display = 'block';
        getByQuery('.login-error').textContent = input;
    }

    return {
        login,
        logout
    }

}());

const articleService = (function () {
    let page;
    let filter;

    function showArticleListPage() {
        page = 1;
        const pr = requests.getArticles(0, 5, filter);
        pr.then((res) => {
            pageRenderer.openMainPage();
            updateArticleList(res);
        },
            messagesService.showWarning
        );
    }

    function paginationNext() {
        const pr = requests.getArticles(page * 5, 5, filter);
        pr.then(updateArticleList, messagesService.showWarning);
        page++;
    }

    function paginationPrev() {
        page--;
        const skip = page === 1 ? 0 : page * 5;
        const pr = requests.getArticles(skip, 5, filter);
        pr.then(updateArticleList, messagesService.showWarning);
    }

    function applyFilter() {
        const dateFrom = new Date(getById('dateFromSearchbox').value).getTime();
        const dateTo = new Date(getById('dateToSearchbox').value).getTime();
        const author = getById('filterByAuthor').value;

        filter = {};

        if(dateFrom) {
            filter.dateFrom = dateFrom;
        }

         if(dateTo) {
            filter.dateTo = dateTo;
        }

        if (author !== 'none') {
            filter.author = author;
        }

        showArticleListPage();
    }

    function resetFilter() {
        filter = {};
        getById('dateFromSearchbox').value = '';
        getById('dateToSearchbox').value = '';
        getById('filterByAuthor').value = 'none';

        showArticleListPage();
    }

    function updateArticleList(options) {
        const plStyle = page !== 1 ? 'inline' : 'none';
        getById('paginate-left').style.display = plStyle;

        const prStyle = options.hasMore ? 'inline' : 'none';
        getById('paginate-right').style.display = prStyle;

        const articles = options.articles;
        pageRenderer.updateArticleList(articles);
    }

    function clickEventHandle(event) {
        const t = event.target;
        if (t.tagName === 'DIV' || t.tagName === 'IMG' || t.tagName == 'A') {
            if (t.dataset.type === 'delete') {
                deleteArticle(t.dataset.id);
            } else if (t.dataset.type === 'edit') {
                openEditForm(t.dataset.id);
            } else if (t.dataset.type === 'more') {
                openFullPage(t.dataset.id);
            } else if (t.dataset.type === 'read') {
                openFullPage(t.dataset.id);
            } else if (t.parentElement.parentElement.dataset.type === 'more') {
                openFullPage(t.parentElement.parentElement.dataset.id);
            }
        }
    }

    function deleteArticle(id) {
        const pr = requests.deleteArticle(id);
        pr.then(showArticleListPage, messagesService.showWarning);
    }

    function openEditForm(id) {
        const pr = requests.getArticle(id)
        pr.then(pageRenderer.openEditForm, messagesService.showWarning);
    }

    function openFullPage(id) {
        const pr = requests.getArticle(id)
        pr.then(pageRenderer.openFullPage, messagesService.showWarning);
    }

    return {
        showArticleListPage,
        paginationNext,
        paginationPrev,
        applyFilter,
        resetFilter,
        clickEventHandle,
    }
}());

function init(username) {
    user = username;
    if(user) {
        messagesService.showMessage(`Hello, ${user}`);
    }

    getByQuery(".login-header").style.fontFamily = 'Helvetica';

    const buttonindex = getById('button-toindex');
    const buttonadd = getById('add-news');
    const buttonabout = getById('button-toabout');
    const buttonlogin = getById('button-login');
    const buttonsearch = getById('searchtoggle');
    const searchcross = getById('searchcross');
    const pageNext = getById('paginate-right-btn');
    const pagePrev = getById('paginate-left-btn');

    const mainPage = getById('main-page-newssection');
    const editbox = getByQuery('.news-editbox-full');

    const editSubmit = getById('edit-submit');
    const editCancel = getById('edit-cancel');

    const addSubmit = getById('submit')
    const addCancel = getById('clear');

    const submitLogin = getById('submit-button-login');
    const cancelLogin = getById('cancel-button-login');

    const applyFilter = getById('applyfilters');
    const clearFilters = getById('clearfilters');

    buttonindex.addEventListener('click', articleService.showArticleListPage);
    buttonadd.addEventListener('click', pageRenderer.openAddForm);
    buttonabout.addEventListener('click', pageRenderer.openAboutPage);
    buttonlogin.addEventListener('click', pageRenderer.openLoginForm);
    buttonlogin.addEventListener('click', loginService.logout);
    buttonsearch.addEventListener('click', pageRenderer.showFilterForm);
    searchcross.addEventListener('click', pageRenderer.showFilterForm);
    pageNext.addEventListener('click', articleService.paginationNext);
    pagePrev.addEventListener('click', articleService.paginationPrev);

    mainPage.addEventListener('click', articleService.clickEventHandle);
    editbox.addEventListener('click', articleService.clickEventHandle);

    editSubmit.addEventListener('click', articleFormController.editArticle);
    editCancel.addEventListener('click', pageRenderer.openMainPage);

    addSubmit.addEventListener('click', articleFormController.addArticle);
    addCancel.addEventListener('click', pageRenderer.openMainPage);

    submitLogin.addEventListener('click', loginService.login);
    cancelLogin.addEventListener('click', articleService.showArticleListPage);

    applyFilter.addEventListener('click', articleService.applyFilter);
    clearFilters.addEventListener('click', articleService.resetFilter);

    articleService.showArticleListPage();
}

(function () {
    const prUser = requests.checkUser()
    prUser.then(init, messagesService.showWarning);

    const prAuth = requests.getAuthors();
    prAuth.then(pageRenderer.initAuthors, messagesService.showWarning);
}());

function getById(id) {
    return document.getElementById(id);
}

function getByQuery(query) {
    return document.querySelector(query);
}

function getByClass(className) {
    return document.getElementsByClassName(className);
}
