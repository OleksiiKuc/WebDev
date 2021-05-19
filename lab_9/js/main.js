(function(global){
    
    var ns = {};

    var homeHtml = "snippets/home-snippet.html";
    var allCategoriesUrl = "data/categories.json";
    var categoriesTitleHtml = "snippets/category-title-snippet.html";
    var categoryHtml = "snippets/category-snippet.html";

    var insertHtml = function(selector, html) {
        var targetElem = document.querySelector(selector);
        targetElem.innerHTML = html;
    };

    var showLoading = function(selector) {
        var html = "<div class='text-center'>";
        html += "<img src='../images/ajax-loader.gif' alt='loading'></div>";
        insertHtml(selector, html);
    };

    var insertProperty = function(string, propName, propValue) {
        var propToReplace = "{{" + propName + "}}";
        string = string.replace(new RegExp(propToReplace, "g"), propValue);
        return string;
    }

    document.addEventListener("DOMContentLoaded", function() {

        showLoading("#main__content");
        $ajaxUtils.sendGetRequest(
            homeHtml, function(responseText) {
                document.querySelector("#main__content").innerHTML = responseText;
            }, false);
    });

    ns.loadCatalogCategories = function() {
        showLoading("#main__content");
        $ajaxUtils.sendGetRequest(allCategoriesUrl, buildAndShowCategoryHTML);
    };

    function buildAndShowCategoryHTML(categories) {
        $ajaxUtils.sendGetRequest(categoriesTitleHtml, function(categoriesTitleHtml) {
            $ajaxUtils.sendGetRequest(categoryHtml, function(categoryHtml) {
                var categoryViewHtml = buildCategoryViewHtml(categories, categoriesTitleHtml, categoryHtml);
                insertHtml("#main__content", categoryViewHtml);
            }, false);
        }, false);
    }

    function buildCategoryViewHtml(categories, categoriesTitleHtml, categoryHtml) {
        var finalHtml = categoriesTitleHtml;

        for(var i = 0; i < categories.lenght; i++) {
            var html = categoryHtml;
            var name = "" + categories[i].name;
            var short_name = categories[i].short_name;
            html = insertProperty(html, "name", name);
            html = insertProperty(html, "short_name", short_name);
            finalHtml += html;
        }
        return finalHtml;
    }

    global.$ns = ns;
})(window);

$(function(){

    $('.main__slider').slick({
        speed: 500,
        fade: true,
        cssEase: 'linear',
        prevArrow: '<button class="slick-btn slick-prev"><img src="images/Arrow-left.svg" alt="prev"></button>',
        nextArrow: '<button class="slick-btn slick-next"><img src="images/Arrow-right.svg" alt="next"></button>'
      });

});
