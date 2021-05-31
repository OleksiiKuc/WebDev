(function() {

    $('.main__slider').slick({
        speed: 500,
        fade: true,
        cssEase: 'linear',
        prevArrow: '<button class="slick-btn slick-prev"><img src="images/Arrow-left.svg" alt="prev"></button>',
        nextArrow: '<button class="slick-btn slick-next"><img src="images/Arrow-right.svg" alt="next"></button>',
    });
})();

(function(global){


    var ns = {};

    var homeHtml = "snippets/home-snippet.html";
    var allCategoriesUrl = "data/catalog.json";
    var categoriesTitleHtml = "snippets/category-title-snippet.html";
    var categoryHtml = "snippets/category-snippet.html";

    var catalogItemsUrl = "data/categories/";
    var catalogItemsTitleHtml = "snippets/product-title-snippet.html";
    var catalogItemHtml = "snippets/product-snippet.html";

    var insertHtml = function(selector, html) {
        var targetElem = document.querySelector(selector);
        targetElem.innerHTML = html;
    };

    var showLoading = function(selector) {
        var html = "<div class='text-center'>";
        html += "<img src='images/ajax-loader.gif' alt='loading'></div>";
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

    ns.loadHome = function () {
        showLoading("#main__content");
        $ajaxUtils.sendGetRequest(homeHtml, function (responseText) {

            switchHomeToActive();

            document.querySelector("#main__content").innerHTML = responseText;
        }, false);
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
        finalHtml += "<div class='row'>";

        for(var i = 0; i < categories.length; i++) {
            var html = categoryHtml;
            var name = "" + categories[i].name;
            var notes = categories[i].notes;
            var short_name = categories[i].short_name;
            html = insertProperty(html, "name", name);
            html = insertProperty(html, "notes", notes);
            html = insertProperty(html, "short_name", short_name)
            finalHtml += html;
        }
        finalHtml += "</div>";
        return finalHtml;
    }

    ns.loadCatalogItems = function (categoryShort) {
        showLoading("#main__content");
        $ajaxUtils.sendGetRequest(catalogItemsUrl + categoryShort + ".json", buildAndShowCatalogItemsHTML);
    };

     // Builds HTML for the single category page based on the data
        // from the server
        function buildAndShowCatalogItemsHTML(categoryCatalogItems) {
            // Load title snippet of catalog items page
            $ajaxUtils.sendGetRequest(catalogItemsTitleHtml, function (catalogItemTitleHtml) {
                // Retrieve simple catalog item snippet
                $ajaxUtils.sendGetRequest(catalogItemHtml, function (catalogItemHtml) {

                    var catalogItemsViewHtml = buildCatalogItemsViewHtml(categoryCatalogItems, catalogItemTitleHtml, catalogItemHtml);
                    insertHtml("#main__content", catalogItemsViewHtml);
                }, false);
            }, false);
        }

        // Using category and catalog items data and snippets html
        // build catalog items view HTML to be inserted into page
        function buildCatalogItemsViewHtml(categoryCatalogItems, catalogItemsTitleHtml, catalogItemHtml) {

            catalogItemsTitleHtml = insertProperty(catalogItemsTitleHtml, "name", categoryCatalogItems.category.name);

            catalogItemsTitleHtml = insertProperty(catalogItemsTitleHtml, "special_instructions", categoryCatalogItems.category.special_instructions);

            var finalHtml = catalogItemsTitleHtml;

            finalHtml += "<div class='row'>";

            // Loop over catalog items
            var catalogItems = categoryCatalogItems.catalog_items;
            var catShort_name = categoryCatalogItems.category.short_name;
            for (var i = 0; i < catalogItems.length; i++) {
                //Insert catalog item values
                var html = catalogItemHtml;

                html = insertProperty(html, "short_name", catalogItems[i].short_name);

                html = insertProperty(html, "catShort_name", catShort_name);

                html = insertItemPrice(html, "price_retail", catalogItems[i].price_retail);

                html = insertItemAmount(html, "amount_retail", catalogItems[i].amount_retail);

                html = insertItemPrice(html, "price_wholesale", catalogItems[i].price_wholesale);

                html = insertItemAmount(html, "amount_wholesale", catalogItems[i].amount_wholesale);

                html = insertProperty(html, "name", catalogItems[i].name);

                html = insertProperty(html, "description", catalogItems[i].description);

                finalHtml += html;
            }

            finalHtml += "</div>";
            return finalHtml;
        }

        // Appends price with '$' if price exists
        function insertItemPrice(html, pricePropName, priceValue) {
            // If not specified, replace with empty string
            if (!priceValue) {
                return insertProperty(html, pricePropName, "");
            }
            priceValue = "$" + priceValue.toFixed(2);
            html = insertProperty(html, pricePropName, priceValue);
            return html;
        }

        // Appends portion name in parens if it exists
        function insertItemAmount(html, amountPropName, amountValue) {
            // If not specified, replace original string
            if (!amountValue) {
                return insertProperty(html, amountPropName, "");
            }
            amountValue = "(" + amountValue + ")";
            html = insertProperty(html, amountPropName, amountValue);
            return html;
        }

        var switchHomeToActive = function () {
            // Remove 'active' from catalog button
            var classes = document.querySelector("#menu__list-linkCatalog").className;
            classes = classes.replace(new RegExp("active", "g"), "");
            document.querySelector("#menu__list-linkCatalog").className = classes;

            // Add 'active' to menu button if not already there
            classes = document.querySelector("#menu__list-linkHome").className;
            if (classes.indexOf("active") === -1) {
                classes += " active";
                document.querySelector("#menu__list-linkHome").className = classes;
            }
        };

        ns.loadRandom = function (categoryShort) {
            showLoading("#main__content");

            var randomCategoriesJSON = ["A", "B", "C", "D"].find((_, i, ar) => Math.random() < 1 / (ar.length - i));//ES6
            $ajaxUtils.sendGetRequest(catalogItemsUrl + randomCategoriesJSON + ".json", buildAndShowCatalogItemsHTML);
        };

    global.$ns = ns;

})(window);

