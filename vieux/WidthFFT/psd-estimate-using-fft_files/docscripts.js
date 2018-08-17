    
        
// Toggle a division as expanded or collapsed.
// Also toggle the arrow icon.
// Refer to the division and image by their IDs.
//
// "Collapsed" material is hidden using the
// display property in CSS.

// Used by adaptproduct function (see below)
// to support adaptive doc in the Windows
// version of the Help Browser.
var adaptiveIds = new Array();
function toggleexpander(blockid, arrowid) {
    arrow = document.getElementById(arrowid);
    block = document.getElementById(blockid);
    if (block.style.display == "none") {
        // Currently collapsed, so expand it.
        block.style.display = "block";
        arrow.src = "arrow_down.gif";
        arrow.alt = "Click to Collapse";
    }
    else {
        // Currently expanded, so collapse it.
        block.style.display = "none";
        arrow.src = "arrow_right.gif";
        arrow.alt = "Click to Expand";
    }
    return false; // Make browser ignore href.
}

// ===================================================
// Create and uniquely name two levels of upward navigation buttons
// for Functions -- By Category pages

var top_button_count = 0;
var current_section_id = 0;

function addTopOfPageButtons() {

    top_button_count = top_button_count + 1;

    var top_of_page_buttons =

        "<a class=\"pagenavimglink\" href=\"#top_of_page\" onMouseOver=\"document.images.uparrow" +
            top_button_count +
            ".src=\'doc_to_top_down.gif\'\;\" onMouseOut=\"document.images.uparrow" +
            top_button_count +
            ".src=\'doc_to_top_up.gif\'\;\"><img style=\"margin-top:0;margin-bottom:0px;padding-top:0;padding-bottom:0\" border=0 src=\"doc_to_top_up.gif\"  alt=\"Back to Top of Page\" title=\"Back to Top of Page\" name=\"uparrow" +
            top_button_count +
            "\">\&nbsp\;</a>";

    document.write(top_of_page_buttons);
}


function updateSectionId(id) {
    current_section_id = id;
}


function addTopOfSectionButtons() {

    top_button_count = top_button_count + 1;

    var top_of_page_buttons =

        "<a class=\"pagenavimglink\" href=" +
            "\"#" + current_section_id + "\"" +
            " onMouseOver=\"document.images.uparrow" +
            top_button_count +
            ".src=\'doc_to_section_down.gif\'\;\" onMouseOut=\"document.images.uparrow" +
            top_button_count +
            ".src=\'doc_to_section_up.gif\'\;\"><img style=\"margin-top:0;margin-bottom:0px;padding-top:0;padding-bottom:0\" border=0 src=\"doc_to_section_up.gif\"  alt=\"Back to Top of Section\" title=\"Back to Top of Section\" name=\"uparrow" +
            top_button_count +
            "\">\&nbsp\;</a>";

    document.write(top_of_page_buttons);
}

// ===================================================
// Create and write to the document stream HTML for 
// the link to the Doc Feedback Survey site.
//
// Doing this through a JavaScript function is necessary
// to work around the an issue with pages that are found
// through the search facility of the help browser--
//
// When found as the result of a search, 
// the document that is displayed in the Help browser
// is actually a temporary document with a trivial URL
// such as "text://5", not an actual page location.
//
// But the Help browser inserts a <BASE> element at the beginning
// of each such temporary page, and the <BASE> element stores the
// actual location. 
//
// So this function tests the URL of the document for the expression "text://"
// and if that expression is found, attempts to use the URL stored in
// the <BASE> element.

function writeDocFeedbackSurveyLink() {
    var queryexpression = document.location.href;
    var istempsearchpage = false;

    if (queryexpression.indexOf("help/ja_JP/") >= 0) {
        // Japanese
        str_yes = "&#x306f;&#x3044;";
        str_no = "&#x3044;&#x3044;&#x3048;";
        str_helpful = "<span style=\"font-size:1.2em\">&#x3053;&#x306e;&#x60c5;&#x5831;&#x306f;&#x5f79;&#x306b;&#x7acb;&#x3061;&#x307e;&#x3057;&#x305f;&#x304b;&#xff1f;</span>";
    }
	else if (queryexpression.indexOf("help/zh_CN/") >= 0) {
        // Chinese
        str_yes = "&#x662F;";
        str_no = "&#x5426;";
        str_helpful = "<span style=\"font-size:1.2em\">&#x8FD9;&#x91CC;&#x7684;&#x8BAE;&#x9898;&#x5BF9;&#x4F60;&#x6709;&#x5E2E;&#x52A9;&#x5417;&#xFF1F;</span>";
    }
    else {
        // Default to English
        str_yes = "Yes";
        str_no = "No";
        str_helpful = "Was this topic helpful?";
    }
    ;

    if (queryexpression.search(/text:\/\//) != -1) {
        var baseelement = document.getElementsByTagName("BASE")[0];
        queryexpression = baseelement.href;
    }
    survey_url_yes = "http://www.customersat3.com/TakeSurvey.asp?si=YU2FDmNEifg%3D&SF=" + queryexpression + "-YES";
    survey_url_no = "http://www.customersat3.com/TakeSurvey.asp?si=YU2FDmNEifg%3D&SF=" + queryexpression + "-NO";

    code = '<div style="padding-right:10px" class="feedbackblock">' + '<strong>' + str_helpful + '</strong> <input type="button" value="' + str_yes + '" onClick="openWindow(\'' + survey_url_yes + '\',850,680, \'scrollbars=yes,resizable=yes\'); return false;"/>' + '&nbsp;&nbsp;' + '<input type="button" value="' + str_no + '" onClick="openWindow(\'' + survey_url_no + '\',850,680, \'scrollbars=yes,resizable=yes\'); return false;"/>' + '</div>';
    document.write(code);
}


// Utility function replacing openWindow function used by the web-site survey link code.
// In the help browser, the original code would create a blank window before loading the URL into the system browser.
function openWindow(url, width, height, options, name) {
    // ignore the arguments, except url
    document.location = url;
} // end function openWindow


// Utility function for linking to feedback survey, as of R2012b.
function openFeedbackWindow(url) {
    window.open(url,"_blank");
} // end function openFeedbackWindow



// ===================================================
// Workaround for G801125.
// This global object check tests for IE8 or lower.
if (document.all && !document.getElementsByClassName) {
   document.createElement("section");
}



// ===================================================
// Function reference pages

$(window).load(function () {
    // Perform breadcrumb check in window load, since all the images in the breadcrumb
    // need to be loaded for correct width calculations.
    checkBreadcrumb();
});

$(document).ready(function () {
    //Perform JS code which has any user visible impact first.
    //Check image sizes. Do not scale animated images or any images with hotspots.
    $('#doc_center_content img:not(".animated-image, [usemap]"), #content_container2 img:not(".animated-image, [usemap]")').each(function () {
        checkImage($(this));
    });

    $('#doc_center_content img.animated-image, #content_container2 img.animated-image').each(function () {
        checkAnimatedImage($(this));
    });

    $('.expandAllLink').click(function(e) {
        e.stopPropagation();
        var link = $(this);
        if (link.data('allexpanded')) {
            doCollapse(link);
            link.data('allexpanded', false);
            link.html('expand all');
        } else {
            doExpand(link);
            link.data('allexpanded', true);
            link.html('collapse all');
        }
    });

    $("#content_container").delegate(".expand", "click", function(e) {
        e.stopPropagation();
        doToggle($(this));
        return false;
    });

    $('#expand_page').click(function () {
        var link = $(this).find('a');
        if (link.data('allexpanded')) {
            doCollapse($('.collapse'));
            link.data('allexpanded', false);
            link.html('expand all');
        } else {
            doExpand($('.collapse'));
            link.data('allexpanded', true);
            link.html('collapse all');
        }
    });

    var tocUrl = $(".toc_icon a:first").attr('href');
    $(".toc_icon:first").data({
        "tocUrl":tocUrl
    });
    $(".toc_icon a:first").remove();

    //Bind first click on toc_icon to fetch the toc contents.
    //Bind all subsequent clicks to toggle to the TOC.
    $(".toc_icon").one('click', function (e) {
        e.stopPropagation();
        setupToc();
        $(this).click(function (evt) {
            evt.stopPropagation();
            var tocEl = $('div.toc_container_wrapper:first');
            toggleToc(tocEl);
        });
    });

    addSmoothScroll();
    $(window).resize(function () {
        setTocSize($(".toc_container_wrapper:first"));
        resizeBreadcrumb();
    });
});

function resizeBreadcrumb() {
    var breadcrumb = getBreadcrumb();
    var oldbreadcrumbWidth = breadcrumb.data('width');
    resetBreadcrumbCss(breadcrumb);

    var currentBreadcrumbWidth = breadcrumb.width();

    if (oldbreadcrumbWidth < currentBreadcrumbWidth) {
        checkAndExpandBreadCrumb(breadcrumb);
    } else if (oldbreadcrumbWidth > currentBreadcrumbWidth) {
        checkAndCollapseBreadCrumb(breadcrumb);
    }
    breadcrumb.data('width', currentBreadcrumbWidth);
    setBreadcrumbCss(breadcrumb);
}

function checkAndCollapseBreadCrumb(breadcrumb) {
    var availableBreadcrumbWidth = breadcrumb.width();
    var collapsibleBreadcrumbChildren = $(".breadcrumbs_collapsed:last").nextAll();
    if (collapsibleBreadcrumbChildren.length === 0) {
        collapsibleBreadcrumbChildren = $(".breadcrumbs_inner ul li:gt(1)");
    }

    collapsibleBreadcrumbChildren.each(function (i, elem) {
        var actualBreadcrumbWidth = 0;
        breadcrumb.find('li').each(function() {
            actualBreadcrumbWidth += $(this).width();
        });
        if (actualBreadcrumbWidth <= availableBreadcrumbWidth) {
            return false;
        }
        collapseBreadcrumbElement($(elem));
    });
}


function checkAndExpandBreadCrumb(breadcrumb) {
    var availableBreadcrumbWidth = breadcrumb.width();

    var expandableBreadcrumbChildren = $($(".breadcrumbs_collapsed").get().reverse());
    expandableBreadcrumbChildren.each(function (i, elem) {
        expandBreadcrumbElement($(elem));
        var actualBreadcrumbWidth = 0;
        breadcrumb.find('li').each(function() {
            actualBreadcrumbWidth += $(this).width();
        });
        if (actualBreadcrumbWidth > availableBreadcrumbWidth) {
            collapseBreadcrumbElement($(elem));
            return false;
        }
    });
}

function expandBreadcrumbElement(elem) {
    //Save original width and text of breadcrumb
    var innerSpan = elem.find('span');
    innerSpan.text(innerSpan.data('text'));
    elem.css('width', 'auto');
    elem.removeClass('breadcrumbs_collapsed');
    elem.unbind('mouseenter.breadcrumb mouseleave.breadcrumb');
}

function checkBreadcrumb() {
    var breadcrumb = getBreadcrumb();
    processBreadcrumb(breadcrumb);
    resetBreadcrumbCss(breadcrumb);

    checkAndCollapseBreadCrumb(breadcrumb);

    var availableBreadcrumbWidth = breadcrumb.width();
    breadcrumb.data('width', availableBreadcrumbWidth);

    setBreadcrumbCss(breadcrumb);
}

function resetBreadcrumbCss(breadcrumb) {
    breadcrumb.find('.breadcrumbs_outer').css({'width': 'auto', 'white-space': 'normal', 'overflow': 'auto'});
}

function setBreadcrumbCss(breadcrumb) {
    var availableBreadcrumbWidth = breadcrumb.width() - 3;
    breadcrumb.find('.breadcrumbs_outer').css({'width': availableBreadcrumbWidth, 'white-space': 'nowrap', 'overflow': 'hidden'});
}

function getBreadcrumb() {
    var breadcrumb;
    if ($("#breadcrumbs").length != 0) {
        breadcrumb = $("#breadcrumbs");
    } else {
        breadcrumb = $(".breadcrumbs:first");
    }
    return breadcrumb;
}

function processBreadcrumb(breadcrumb) {
    //Add classes to first and last elements in the breadcrumb.
    breadcrumb.find('li:first').addClass('breadcrumb_first');
    breadcrumb.find('li:eq(1)').addClass('breadcrumb_product');
    breadcrumb.find('li:last').addClass('breadcrumb_last');

    var children = breadcrumb.children();
    breadcrumb.append($('<div class="breadcrumbs_outer"></div>'));
    $(".breadcrumbs_outer").append($('<div class="breadcrumbs_inner"></div>'));
    $(".breadcrumbs_inner").append(children.remove());
}

function collapseBreadcrumbElement(elem) {
    if (elem.hasClass('breadcrumbs_collapsed')) {
        return;
    }
    //Save original width and text of breadcrumb
    var actualWidth = elem.width() + 7; //account for negative padding;
    elem.data({width: actualWidth});
    var innerSpan = elem.find('span');
    innerSpan.data({text: innerSpan.text()});

    //collapse breadcrumb
    elem.css({'width': '20px', 'overflow':'hidden', 'white-space': 'nowrap' });
    innerSpan.text("...");

    elem.addClass('breadcrumbs_collapsed');

    //add hover event handler for collapsed breadcrumb
    addBreadcrumbEventHandler(elem);
}

function addBreadcrumbEventHandler(elem) {

    elem.bind('mouseenter.breadcrumb',
        function() {
            var span = $(this).find('span');
            span.text(span.data('text'));
            $(this).stop();
            $(this).animate({
                width: $(this).data('width')
            });
            return false;
        }).bind('mouseleave.breadcrumb', function() {
            var span = $(this).find('span');
            $(this).stop();
            $(this).animate({
                width: 20
            }, function () {
                span.text("...");
            });
            return false;
        });
}

function getNextSiblingForAnchorTarget(target) {
    var nextSibling;
    if (target.is('a')) {
        nextSibling = target.next();
    } else {
        //This needs to be cleaned up.
        //We need to make sure all anchor targets are anchor tags themselves.
        //
        if (target.children().length > 0) {
            nextSibling = target.children(":first");
        } else {
            nextSibling = target;
        }
    }
    return nextSibling;
}

function addSmoothScroll() {
    $(".intrnllnk").each(function() {
        var hash = this.hash;
        var target = getInternalLinkTarget(hash);
        if (target) {
            $(this).click(function (evt) {
                evt.preventDefault();
                 var nextSibling = getNextSiblingForAnchorTarget(target);
                if (nextSibling.hasClass('expand')) {
                    doExpandNestedParent(nextSibling);
                } else if (!nextSibling.is(":visible")) {
                    doExpandParent(nextSibling);
                }
                //On IE and FF, the slow scroll parameter is the HTML dom element. On webkit, it is the body.
                var scrollParameter = ($.browser.msie || $.browser.mozilla) ? 'html' : 'body';
                $(scrollParameter).animate({scrollTop:target.offset().top - 10}, 700, function () {
                    nextSibling.addClass('anchor_hinting');
                    setTimeout(function () {
                        nextSibling.removeClass('anchor_hinting');
                    }, 600);
                    if (nextSibling.hasClass('expand')) {
                        doExpand(nextSibling);
                    }
                });
                location.hash = hash;
            })
        }
    });
}


function getInternalLinkTarget(hash) {
    //search for anchor with given hash as "name" atrribute value;
    var target = null;

    //Remove the first '#' character from the name attribute. Escape any special character from the name/id.
    var escapedHash = hash.substring(1).replace(/([;&,.+*~':"!^#$%@\[\]\(\)=>\|])/g, '\\$1');

    target = $('[name=' + escapedHash + ']');
    //If no target is found, try to find an element whose id has value = hash.
    if (target.length === 0) {
        target = $(hash);
    }
    return target;
}

function setupToc() {
    var tocEl = getTocEl();
    $(".toc_icon").after(tocEl);
    var moreEl = $('<div class="progress_bar"></div>');
    tocEl.find('.toc_container').append(moreEl);
    toggleToc(tocEl);

    setTimeout(function () {
        $.get(getTocUrl(), function (data) {
            moreEl.fadeOut(500, function () {
                moreEl.remove();
            });
            tocEl.find('.toc_container').html(data);
            addTocHandlers(tocEl);
            expandToc(tocEl);
            tocEl.get(0).focus();
        },'html');
    }, 500);
}

function expandToc(tocEl) {
    tocEl.find('li:first').addClass('toc_expanded').removeClass('toc_collapsed');
    tocEl.find(getTocPageId() + ":first").addClass("current_page").parents('li').removeClass('toc_collapsed').addClass('toc_expanded');
}

function getTocEl() {
    var toc_container_wrapper = $('<div class="toc_container_wrapper" tabindex="0" style="display:none;"></div>');
    var toc_container_header = $('<div class="toc_container_header">Table of Contents<div class="toc_close_icon"></div></div>');
    var toc_container = $('<div class="toc_container"></div>');
    toc_container_wrapper.append(toc_container_header).append(toc_container);
    setTocSize(toc_container_wrapper);
    return toc_container_wrapper;
}

function setTocSize(toc_container_wrapper) {
    if (toc_container_wrapper) {
//        toc_container_wrapper.width($('#docsearch').outerWidth() + 7);
        toc_container_wrapper.width(getBreadcrumb().innerWidth() - 5);
        toc_container_wrapper.find('.toc_container:first').css('max-height', ($(window).height() * (2 / 3)) + 'px');
    }
}

function addTocHandlers(tocEl) {
    tocEl.on('click', 'div.img_wrapper', function (e) {
        e.stopPropagation();
        toggleTocListEl($(this).closest('li'));
    });

    tocEl.on('click', 'div.text_wrapper', function (e) {
        e.stopPropagation();
        if ($(this).find('a').length > 0) {
            followTocUrl($(this));
            return false;
        }
        toggleTocListEl($(this).closest('li'));
    });

    tocEl.on('mouseenter', "div.text_wrapper", function(e) {
        if (!tocEl.data('keyboard.navigation')) {
            var selectedTocListEl = getSelectedTocListEl(tocEl);
            selectedTocListEl.children('div').children().removeClass('hovering');
            $(this).addClass('hovering');
            if ($(this).children('a').length > 0) {
                correctTocUrl($(this).children('a'));
                return;
            }
            var liParent = $(this).closest('li');
            if (liParent.hasClass('toc_expanded') || liParent.hasClass('toc_collapsed')) {
                $(this).prev('div.img_wrapper').addClass('hovering');
            }
        }
    }).on('mouseleave', 'div.text_wrapper', function(e) {
            if (!tocEl.data('keyboard.navigation')) {
                $(this).parent().children().removeClass('hovering');
            }
    });



    tocEl.on('mouseenter', 'div.img_wrapper', function(e) {
        if (!tocEl.data('keyboard.navigation')) {
            var selectedTocListEl = getSelectedTocListEl(tocEl);
            selectedTocListEl.children('div').children().removeClass('hovering');

            var liParent = $(this).closest('li');

                if (liParent.hasClass('toc_expanded') || liParent.hasClass('toc_collapsed')) {
                    $(this).addClass('hovering');
                }
                if ($(this).next('div.text_wrapper').find('a').length === 0) {
                    $(this).next('div.text_wrapper').addClass('hovering');
                }
        }
    }).on('mouseleave', 'div.img_wrapper', function(e) {
            if (!tocEl.data('keyboard.navigation')) {
                $(this).parent().children().removeClass('hovering');
            }
    });

    tocEl.on('click', 'div.toc_container', function (e) {
        e.stopPropagation();
    });

    tocEl.find('div.toc_close_icon').click(function (e) {
        e.stopPropagation();
        toggleToc(tocEl);
    });

    tocEl.find('div.toc_container_header').click(function (e) {
        e.stopPropagation();
    });
    tocEl.bind('keydown.toc', function(evt) {
        handleTocKeyDown(evt, tocEl);
        return false;
    });
    tocEl.bind('mousemove.toc', function() {
        tocEl.data('keyboard.navigation', false);
    });
}


function fixPath(str) {
    return str.replace(/(index.html)$/, '')
}

function followTocUrl(textDivElt) {
    var locationPath = fixPath(location.pathname);
    var anchor = textDivElt.children('a').get(0);
    var anchorPath = fixPath(anchor.pathname);
    if (locationPath == anchorPath && anchor.hash !== '') {
        toggleTocListEl(textDivElt.closest('li'));
        return;
    }

    if (!textDivElt.children('a').hasClass('corrected_url')) {
        document.location = getTocBaseUrl() + textDivElt.children('a').attr('href');
    } else {
        document.location = textDivElt.children('a').attr('href');
    }

}

function correctTocUrl(tocLink) {
    if (!tocLink.hasClass("corrected_url")) {
        var correctedUrl = getTocBaseUrl() + tocLink.attr('href');
        tocLink.attr('href', correctedUrl);
        tocLink.addClass('corrected_url');
    }
}

function handleTocKeyDown(evt, tocEl) {
    var key = evt.keyCode ? evt.keyCode : evt.which;
    tocEl.data('keyboard.navigation', true);
    if (key === 40) {
        handleTocDownKey(tocEl);
    } else if (key === 38) {
        handleTocUpKey(tocEl);
    } else if(key === 37) {
        handleTocLeftKey(tocEl);
    } else if (key === 39) {
        handleTocRightKey(tocEl);
    } else if (key === 13) {
        handleTocEnterKey(tocEl);
    }
}


function handleTocDownKey(tocEl) {
    var selectedTocListEl = getSelectedTocListEl(tocEl);
    var nextTocListEl;
    if (selectedTocListEl.length === 0) {
        nextTocListEl = tocEl.find("li:first")
    } else {
        if (selectedTocListEl.hasClass('toc_expanded')) {
            nextTocListEl = selectedTocListEl.children('ul:first').find('li:first');
        } else {
            nextTocListEl = getNextTocEl(selectedTocListEl);
        }
    }
    if (nextTocListEl.length > 0) {
        changeTocSelection(nextTocListEl, selectedTocListEl, tocEl);
    }
}

function handleTocUpKey(tocEl) {
    var selectedTocListEl = getSelectedTocListEl(tocEl);
    if (selectedTocListEl.length > 0) {
        var prevTocListEl = getPreviousTocEl(selectedTocListEl);
        if (prevTocListEl.length > 0) {
            changeTocSelection(prevTocListEl, selectedTocListEl, tocEl);
        }
    }
}

function handleTocLeftKey(tocEl) {
    var selectedTocListEl = getSelectedTocListEl(tocEl);
    if (selectedTocListEl.length > 0) {
        if (selectedTocListEl.hasClass('toc_expanded')) {
            toggleTocListEl(selectedTocListEl);
        }
    }
}

function handleTocRightKey(tocEl) {
    var selectedTocListEl = getSelectedTocListEl(tocEl);
    if (selectedTocListEl.length > 0) {
        if (selectedTocListEl.hasClass('toc_collapsed')) {
            toggleTocListEl(selectedTocListEl);
        }
    }
}

function handleTocEnterKey(tocEl) {
    var selectedTocListEl = getSelectedTocListEl(tocEl);
    if (selectedTocListEl.length > 0) {
        var textDiv = selectedTocListEl.children('div').find('div.text_wrapper:first');
        if (textDiv.find('a').length > 0) {
            followTocUrl(textDiv);
            return false;
        }
        toggleTocListEl(selectedTocListEl);
    }
}

function changeTocSelection(newListEl, oldListEl, tocContainer) {
    var textDiv = newListEl.children('div').find('div.text_wrapper');
    var toggleDiv = newListEl.children('div').find('div.img_wrapper');
    textDiv.addClass('hovering');
    if (newListEl.hasClass('toc_expanded') || newListEl.hasClass('toc_collapsed')) {
        toggleDiv.addClass('hovering');
    }

    newListEl.attr('tabindex', -1);
    newListEl.get(0).focus();
    if (textDiv.children('a').length > 0) {
        correctTocUrl(textDiv.children('a'));
    }
    oldListEl.children('div').find('div').removeClass('hovering');
}

function getNextTocEl(selectedTocEl) {
    var nextTocListEl = [];

    nextTocListEl = selectedTocEl.next("li");
    if (nextTocListEl.length > 0) {
        return nextTocListEl;
    }

    //If a sibling li element is not found, we need to traverse the tree up.
    //Before traversing the tree up, make sure we do not have any sibling ul elements.
    var siblingUlEl = selectedTocEl.next('ul');
    if (siblingUlEl.length > 0) {
        nextTocListEl = siblingUlEl.find('li:first');
    }
    if (nextTocListEl.length > 0) {
        return nextTocListEl;
    }

    // if a sibling li, ul element is not found, traverse the tree up.
    // First check if there are any next sibling 'ul' elements to the parent.
    var parentSiblingUlEl= selectedTocEl.parent('ul').next('ul');
    if (parentSiblingUlEl.length > 0) {
        nextTocListEl = parentSiblingUlEl.find('li:first');
    }
    if (nextTocListEl.length > 0) {
        return nextTocListEl;
    }

    //if none of the conditions are met, find the next toc list element recursively using the parent 'li' element as the
    // starting point.
    var parentListEl = selectedTocEl.parents('li:first');
    if (parentListEl.length > 0) {
        return getNextTocEl(parentListEl);
    }
    return nextTocListEl;
}

function getPreviousTocEl(selectedTocEl) {
    var prevTocListEl = [];

    // It is important that these checks are performed in this order.
    //First, check if there exists a sibling 'li' element.
    prevTocListEl = selectedTocEl.prev('li');
    if (prevTocListEl.length > 0) {
        //If a previous sibling does exist, make sure we check if the li element is expanded.
        //If the previous sibling is expanded, get the last open/visible toc list element in that subtree.
        prevTocListEl = getLastOpenTocListEl(prevTocListEl);
        return prevTocListEl;
    }

    //if a sibling li element is not found, we need to traverse the tree upwards/backwards
    // before traversing the tree up, make sure we do not have any sibling ul elments;
    var siblingUlEl = selectedTocEl.prev('ul');
    if (siblingUlEl.length > 0) {
        prevTocListEl = siblingUlEl.children('li:last');
        prevTocListEl = getLastOpenTocListEl(prevTocListEl);
    }
    if (prevTocListEl.length > 0) {
        return prevTocListEl;
    }

    // if a sibling li, ul element is not found, traverse the tree up.
    // First check if there are any previous sibling 'ul' elements to the parent.
    var parentSiblingUlEl = selectedTocEl.parent('ul').prev('ul');
    if (parentSiblingUlEl.length > 0) {
        prevTocListEl = parentSiblingUlEl.children('li:last');
        prevTocListEl = getLastOpenTocListEl(prevTocListEl);
    }
    if (prevTocListEl.length > 0) {
        return prevTocListEl;
    }

    // if the selected toc list element is the first in the list, find the parent toc list element.
    // Do not try to check if the toc list element is expanded, as that would lead to an infinite loop.
    var selectedTocElIndex = selectedTocEl.index();
    if (selectedTocElIndex === 0) {
        prevTocListEl = selectedTocEl.parents("li:first");
    }

    if (prevTocListEl.length > 0) {
        return prevTocListEl;
    }

    //if none of the conditions are met, find the previous toc list element recursively using the parent 'li' element as the
    // starting point.
    var parentListEl = selectedTocEl.parents('li:first').prev("li");
    if (parentListEl.length > 0) {
        return getPreviousTocEl(parentListEl);
    }
    return prevTocListEl;
}

function getLastOpenTocListEl(tocListEl) {
    var isExpanded = true;
    while (isExpanded) {
        if (tocListEl.hasClass('toc_expanded')) {
            tocListEl = tocListEl.children('ul:last').children('li:last');
        } else {
            isExpanded = false;
        }
    }
    return tocListEl;
}

function getSelectedTocListEl(tocEl) {
    return tocEl.find('.hovering:first').closest('li');
}

function toggleToc(tocEl) {
    if (tocEl.is(":visible")) {
        setTimeout(function () {
            tocEl.data({tocHeight:tocEl.height()})
        }, 0);
        tocEl.hide();
    } else {
        if (tocEl.data('tocHeight')) {
            var h = tocEl.data('tocHeight');
            tocEl.height(0);
            tocEl.css('display', 'block');
            tocEl.animate({height:h + 'px'}, function () {
                tocEl.css('height', 'auto');
                tocEl.get(0).focus();
            });
        } else {
            tocEl.slideDown('fast');
        }
    }
}

function toggleTocListEl(liEl) {
    if (liEl.hasClass('toc_expanded')) {
        liEl.children('ul').slideUp('fast', function () {
            liEl.removeClass('toc_expanded').addClass('toc_collapsed');
        });
    } else if (liEl.hasClass('toc_collapsed')) {
        liEl.children('ul').slideDown('fast', function () {
            liEl.removeClass('toc_collapsed').addClass('toc_expanded');
        });
    }
}
function getTocUrl () {
    return $('.toc_icon:first').data('tocUrl');
}

function getTocPageId() {
    var pathArray = ($(location).attr('pathname') + $(location).attr('href')).replace(/\/$/,'').split("/");
    var productDir = $(".toc_icon").attr("id").replace(/^toc\./,'');
    var reversePathArray = $(pathArray).get().reverse();
    var productDirIndex = $.inArray(productDir, reversePathArray);
    var pageId = "";
    if (productDirIndex === 0) {
        pageId = productDir + ".index.html";
    } else {
        productDirIndex = pathArray.length - productDirIndex - 1;
        pathArray.splice(0, productDirIndex);
        pageId =  pathArray.join(".");
    }
    return "#" + pageId.replace(/\./g, '\\.').replace(/\#/g, '\\#');
}

//Get teh correct base URL for the TOC links, based on the current page.
function getTocBaseUrl() {
    var tocUrl = getTocUrl();
    return tocUrl.substring(tocUrl,tocUrl.indexOf("doccentertoc"));
}

function checkAnimatedImage(imgElt) {
    imgElt.data('src', imgElt.attr('src'));
    imgElt.click(toggleImageAnimation);
}

function checkImage(imgElt) {
    //callback to be executed when image loads
    var callback = function () {
        if (needsScaling(imgElt)) {
            imgElt.addClass('scaled-image');
            imgElt.click(toggleImageScaling);
        }
    };
    //Preload image.
    loadImage(imgElt, callback);
}

function loadImage(imgElt, callback) {
    var img = new Image();
    img.onload = function () {
        imgElt.data('fullsize', {
            'width':img.width,
            'height':img.height
        });
        callback();
    };
    img.src = imgElt.attr('src');
}


function needsScaling(imgElt) {
    var fullSize = imgElt.data('fullsize');
    //Vary width and height values here to change scaling parameters.
    return fullSize.width > 480 || fullSize.height > 330;
}

function toggleImageAnimation() {
    var imgElt = $(this);
    if (imgElt.hasClass('dynamic-image')) {
        //swap in the static image
        imgElt.attr('src', imgElt.data('src'));
        imgElt.removeClass('dynamic-image');
        imgElt.attr('title', 'Play');
    } else {
        //swap in the animated image.
        var anm_prefix = "_anmtd_";
        var anm_suffix = ".gif";
        var pathArray = imgElt.data('src').split("/");
        var fileName = pathArray.slice(-1)[0];
        pathArray[pathArray.length - 1] = anm_prefix + fileName.split(".")[0] + anm_suffix;;
        var anm_src = pathArray.join("/");
        imgElt.attr('src', anm_src);
        imgElt.addClass('dynamic-image');
        imgElt.attr('title', 'Stop');
    }
}

//Setup image scaling.
function toggleImageScaling() {
    var imgElt = $(this);
    if (imgElt.hasClass('expanded-image')) {
        imgElt.animate({
            'max-width':'400px',
            'max-height':'300px'
        }, function () {
            imgElt.removeClass('expanded-image');
        });
    } else {
        var fullSize = imgElt.data('fullsize');
        imgElt.animate({
            'max-width':fullSize.width + 'px',
            'max-height':fullSize.height + 'px'
        }, function () {
            imgElt.addClass('expanded-image');
        });
    }
}

function findExpandableContent(elt) {
    if (!elt.hasClass('expandableContent')) {
        elt = elt.closest('.expandableContent');
    }
    return elt;
}

function doExpand(elt) {
    var expandable = findExpandableContent(elt);
    expandable.find('.collapse').slideDown(function () {
        expandable.find('.expand').addClass('expanded');
        checkExpandAllLinkState(elt);
    });
}

function doCollapse(elt) {
    var expandable = findExpandableContent(elt);
    //Before collapsing, check if the collapse child has any expandableContent children.
    //If it does, those divs need to be collapsed and not the parent.
    if (expandable.find('.collapse').children('.expandableContent').length > 0) {
        expandable =  expandable.find('.collapse').children('.expandableContent');
    }
    expandable.find('.collapse').slideUp(function () {
        expandable.find('.expand').removeClass('expanded');
        checkExpandAllLinkState(elt);
    });
}

function doToggle(elt) {
    var expandable = findExpandableContent(elt);
    expandable.children('.collapse').slideToggle(function () {
        expandable.children('.expand').toggleClass('expanded');
        checkExpandAllLinkState(elt);
    });
}

function checkExpandAllLinkState(elt) {
    //Check if the expandable elt is nested within another expandable elt.
    var expandableParent = elt.parents('.expandableContent:eq(1)');

    // If element is not nested, or there is not expand all link, return
    if (expandableParent.length === 0 || expandableParent.find('.expandAllLink').length === 0) {
        return;
    }
    var expandAllLink = expandableParent.find('.expandAllLink:first');
    var expandableChildren = expandableParent.find('.expandableContent');


    if (elt.hasClass('expanded')) {
        var allChildrenExpanded = true;
        expandableChildren.each(function() {
            var expand = $(this).find('.expand');
            if (!expand.hasClass("expanded")) {
                allChildrenExpanded = false;
            }
        });
        if (allChildrenExpanded) {
            expandAllLink.data('allexpanded', true);
            expandAllLink.html("collapse all");
        }
    } else {
        var allChildrenCollapsed = true;
        expandableChildren.each(function() {
            var expand = $(this).find('.expand');
            if (expand.hasClass("expanded")) {
                allChildrenCollapsed = false;
            }
        });

        if (allChildrenCollapsed) {
            expandAllLink.data('allexpanded', false);
            expandAllLink.html("expand all");
        }
    }
}

function doExpandNestedParent(elt) {
    var expandable = findExpandableContent(elt);
    var expandableParent = expandable.parent().siblings('.expand');
    if (expandableParent.length > 0) {
        if (!expandableParent.hasClass('expanded')) {
            doToggle(expandableParent);
        }
    }
}

// This method is used to support the old HTML template for the ref pages. When all the ref pages have been
// converted to the new template, consolidate this method with the doExpandNestedParent method above.
function doExpandParent(elt) {
    var expandable = elt.closest('.collapse');
    var expandableParent = expandable.siblings('.expand');
    if (expandableParent.length > 0) {
        if (!expandableParent.hasClass('expanded')) {
            doToggle(expandableParent);
        }
    }
}

// ===================================================

// Copyright 2002-2012 The MathWorks, Inc.
