var Alloy = require('alloy');

var win = $.win;

// Passed Arguments
var args = arguments[0] || {};
var tab = args.tab || '';
var nid = args.nid || '';
var title = args.title || '';
var body = args.body || '';
var author = args.author || '';

win.title = title;

var bComments = Ti.UI.createButton({title:'Comments'});
bComments.addEventListener('click', function(e){
	var win = Alloy.createController('comments', {nid:nid, tab:tab}).getView();
	tab.open(win);
});

if(OS_ANDROID){
	bComments.top = 60;
	bComments.right = 5;
	win.add(bComments);
}else{
	win.rightNavButton = bComments;
}

var firstTime = true;
var isUpdating = false;
var now;

// Called every time the user clicks the Blog Tab
var init = function(){
	Ti.API.info('[blog][init]');
	
	if(Ti.Network.online){
		if(Alloy.Globals.shouldUpdate('last_update_blog_node_' + nid)){
			if(firstTime){
				populate();
			}
			
			updateFromNetwork();
		}else{
			populate();
		}
		
	}else{
		populate();
	}
	
};

var updateCommentsButton = function(){
	var node_data_string = Alloy.Globals.db.getValueByKey('blog_data_node_' + nid);
	if(node_data_string != ''){
		var node_data = JSON.parse(node_data_string);
		var total_comments_string = node_data.comment_count;
		var total_comments = parseInt(total_comments_string);
		
	//	if(total_comments > 0){
			bComments.title = 'Comments (' + total_comments + ')';
		}
	//}
};

var populate = function(){
	
	var bodyHtml = '<h1>' + title + '</h1><h4>' + author + '</h4>' + body;
	var html = '<html><head><style type="text/css">' + Alloy.Globals.HTML_STYLE + '</style></head><body>' + bodyHtml + '</body></html>';
	$.web.html = html;
	
//	$.web.html = "<p><strong>A lot of mixed feelings&hellip;that&rsquo;s how I&rsquo;d sum up this week.</strong></p>\r\n\r\n<p>I had the privilege and pleasure of teaching a group of young leaders at the local YWAM base this week. It was a workshop I&rsquo;ve developed many years back on how to study the Bible in a simple, yet thorough way. It&rsquo;s called Inductive Bible Study (IBS). All of these young people have taken a basic YWAM course called a DTS (Discipleship Training School), and gone on an extended short-term overseas mission. It was a great start to the week.&nbsp;<em>Until I got a phone call&hellip;</em></p>\r\n\r\n<p>I&rsquo;d been praying for my dear friend, John Michaels, undergoing intensive treatment for cancer when another friend called to let me know our mutual friend and mentor was near death.<em>Heaviness set in</em>.</p>\r\n\r\n<p>This is a friend I had worked closely with over the past 20+ years. We have similar passions for world missions and the Kingdom of God. He was a true and genuine friend. Within a day I heard of his passing.&nbsp;<em>Sadness filled my heart.</em></p>\r\n\r\n<p>Not just that I will miss him, but that his role of leadership within God&rsquo;s kingdom will be missed. God placed him in a strategic place to challenge people to fulfill God&rsquo;s Great Commission.</p>\r\n\r\n<p>The beginning of the year brought an opportunity to see each other and work together once again. John had put together a small conference for missionaries related to ministry he established in the Philippines. I was encouraged to see his vision and passion for going into China to train leaders and pastors involved in the massive underground church movement there.</p>\r\n\r\n<p>This is a huge need&mdash;equipping leaders in regions where few resources for training exist. It is a passion we share and have shared for many years.</p>\r\n\r\n<p><strong>A genuine friendship</strong><br />\r\nI first met John when we served as fellow pastors on a missions board. I moved to the Philippines to serve with this mission, which was one of many passions we shared. The mission focused on equipping pastors and leaders with how to study the Bible using the inductive (IBS) approach. John was proficient in IBS, and developed training materials of his own.</p>\r\n\r\n<p><img alt=\"\" class=\"cke-resize\" src=\"http://www.billholdridge.com/Pics/trip john david.jpg\" /></p>\r\n\r\n<p>As much as he wanted to move to the field, God made it clear that his role was to be a mobilizer for world missions. And he was! This was a deep, driving passion in his heart.</p>\r\n\r\n<p>Four years after my family and I moved to the Philippines, he asked me if I would establish a Bible college. After some prayer, I agreed. There&rsquo;s more to the story, but let&rsquo;s just say, both God and John had to do a bit of spiritual arm-twisting to convince me.</p>\r\n\r\n<p><strong>When I committed, he committed.</strong>&nbsp;A big part of his commitment was stepping back in support of the vision God gave me. And yet, all along the way he coached and cajoled me. We both have strong wills and are passionate. But one thing stood out about my friend John that I don&rsquo;t see enough of&mdash;<em>he was a doer</em>.</p>\r\n\r\n<p>He didn&rsquo;t just talk about what he would do, he followed through and did it. I saw this over a span of many years. In every aspect of his life, what he set out to do, he did, and he acknowledged God&rsquo;s hand in all of it.</p>\r\n\r\n<p><img alt=\"\" src=\"http://www.billholdridge.com/Pics/trip and john.jpg\" /></p>\r\n\r\n<p>He was fully committed to Jesus, his Lord and Savior. He was a mentor and pastor to many other leaders, including me. Men half his age had a hard time keeping up with him, and that&rsquo;s a fact!</p>\r\n\r\n<p>In the summer of 1997, a tragic fire swept through&nbsp;<a href=\"http://rainbowvm.org/\" target=\"_blank\" title=\"Rainbow Village Ministries\">Rainbow Village Ministries</a>. Susan and I received many calls from friends who asked how they could help. John called, not to ask, but to tell us he was coming over and wanted to know what he could bring us. This is who he was.&nbsp;<em>He didn&rsquo;t ask, he acted.</em></p>\r\n\r\n<p>He pastored a large church that included a school, and had constant events going on. He dropped everything to come help us. Within a week he brought duffel bags full of clothing and personal items to replace what we had lost in the fire. He brought cash to buy new cribs for the babies. When they were bought, he put them together and set them up in our temporary nursery (at the site where the Bible college was at that time).</p>\r\n\r\n<p>If you go to&nbsp;<a href=\"https://www.facebook.com/pages/Send-The-Message/158555354236752\" target=\"_blank\" title=\"Send the Message/John Michaels\">his Facebook page</a>&nbsp;you will see plenty of testimonies of love for this man. He was loved because he genuinely loved others.</p>\r\n\r\n<p><strong>A memorial</strong><br />\r\nThis Tuesday night, at 6:00 pm (PST), there will be a memorial service at&nbsp;<a href=\"http://www.ccspringvalley.org/\" target=\"_blank\" title=\"CCSV\">the church he planted</a>&nbsp;in Las Vegas, NV. I&rsquo;m planning on flying out to join the memorial. [You can watch a live stream of the service&nbsp;<a href=\"http://www.ccspringvalley.org/live-broadcast/\" target=\"_blank\" title=\"John Michaels' Memorial Service\">here</a>.]&nbsp;I&rsquo;m sure we&rsquo;ll hear many great testimonies, but I know what would make him most happy.</p>\r\n\r\n<p><img alt=\"\" src=\"http://www.billholdridge.com/Pics/John.jpg\" /></p>\r\n\r\n<p>On his&nbsp;<a href=\"http://www.sendthemessage.org/\" target=\"_blank\" title=\"STM\">ministry website</a>&nbsp;you&rsquo;ll find a question, &ldquo;Where in the world are&nbsp;<em>you</em>&nbsp;going?&rdquo;&nbsp;It is a question to challenge people to obey the Great Commission of Jesus to &ldquo;Go&hellip;!&rdquo;&nbsp;(<a href=\"http://biblia.com/bible/esv/Matt%2028.19-20\">Matt 28:19-20</a>;&nbsp;<a href=\"http://biblia.com/bible/esv/Mark%2016.15\">Mark 16:15</a>)</p>\r\n\r\n<p>The greatest legacy my friend John leaves behind is this challenge and those who&rsquo;ve responded to it&mdash;<em>How will you respond to Jesus&rsquo; call to &ldquo;Go?&rdquo;</em></p>\r\n\r\n<p>It is a challenge I took to heart long ago, and one that still burns in my heart. I daily long and look forward to the next opportunity God opens up.</p>\r\n\r\n<p><strong><em>What about you?</em></strong></p>\r\n\r\n<p>This was the heart of my friend and brother John Michaels, and it lives on in those whom his life touched.</p>\r\n\r\n<p>This hope lifts my heart out of its heaviness for the loss of my friend. I look forward to seeing even more fruit from his labor in God&rsquo;s vineyard. One day we will&nbsp;stand together again in heaven&nbsp;to look upon the focus of our hope&mdash;Jesus.</p>\r\n";
	updateCommentsButton();
	
	firstTime = false;
};

var updateFromNetwork = function(){
	if(!isUpdating){
		isUpdating = true;
	
		// Define the url which contains the full url
		// See how we build the url using the win.nid which is 
		// the nid property we pass to this file when we create the window
		var url = Alloy.Globals.REST_PATH + 'node/' + nid + '.json';
		
		// Create a connection inside the variable xhr
		var xhr = Titanium.Network.createHTTPClient({timeout:Alloy.Globals.timeout});
		
		// Open the xhr
		xhr.open("GET",url);
		
		xhr.onerror = function(){
			handleError();
		};
		
		// When the xhr loads we do:
		xhr.onload = function() {
			// Save the status of the xhr in a variable
			// this will be used to see if we have a xhr (200) or not
			var statusCode = xhr.status;
			
			// Check if we have a xhr
			if(statusCode == 200) {
				// Save the responseText from the xhr in the response variable
				var response = xhr.responseText;
				
				Alloy.Globals.db.updateValueByKey(response, 'blog_data_node_' + nid);
				updateCommentsButton();
				Alloy.Globals.db.updateValueByKey(now.toISOString(), 'last_update_blog_node_' + nid);
				isUpdating = false;
				now = null;
			} 
			else {
				handleError();
			}
		};
		
		now = new Date();
		xhr.send();
	}
};

var handleError = function(){
	isUpdating = false;
};

var tryAgain = function(){
	$.tryAgain.visible = false;
	$.errorLabel.visible = false;
	isUpdating = false;
	updateFromNetwork();
};