$(document).ready(function($) {
    var $content = $('#content');
    var data = {
        rss_url: 'https://medium.com/feed/@MetronomeToken'
    };
    $.get('https://api.rss2json.com/v1/api.json', data, function(response) {
        //console.log(response);
        if (response.status == 'ok') {
            var output = '';
            $.each(response.items, function(k, item) {
                output += '<div class="col-md-6">';
                output += '<div class="blog-post"><header>';
                var tagIndex = item.description.indexOf('<img'); // Find where the img tag starts
                var srcIndex = item.description.substring(tagIndex).indexOf('src=') + tagIndex; // Find where the src attribute starts
                var srcStart = srcIndex + 5; // Find where the actual image URL starts; 5 for the length of 'src="'
                var srcEnd = item.description.substring(srcStart).indexOf('"') + srcStart; // Find where the URL ends
                var src = item.description.substring(srcStart, srcEnd); // Extract just the URL
                output += '<div class="blog-element"><img class="img-fluid" src="' + src + '" width="540px" height="270px"></div></header>';
                output += '<div class="blog-content"><h4><a href="'+ item.link + '" target="_blank">' + item.title + '</a></h4>';
                var postContent = item.description.replace(/<img[^>]*>/g,"");
                postContent.replace(/<h3>[^>]+>/,"");
                var maxLength = 180; // maximum number of characters to extract
                //trim the string to the maximum length
                var trimmedString = postContent.substr(0, maxLength);
                
                //re-trim if we are in the middle of a word
                trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
                output += '<p>' + trimmedString + '...</p>';
                //output += '<h4 class="date">' + item.pubDate + "</h4>";
                output += '<h4 class="date">' + $.format.date(item.pubDate, "MMMM d, yyyy") + "</h4>";
                output += '</div></div></div>';
            });
            $content.html(output);
        }
    });
});