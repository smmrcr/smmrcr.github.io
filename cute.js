//Videos
    var videos = [
    	//The Straight and Narrow, 2011-2014
        '115342481',
        //This Is It, 2012-2014. [Tether for Service Provider at The Royal Standard, Liverpool Biennial 2012.]
        '115210766',
    	  //Terminal, 2013 [for Caddy Life, Field Broadcast, 2013]
        '116466938',
        //Nobody Must Realise, 2014 [for Bed Race Project, Knaresborough. Commissioned by Amelia Beavis Harrison, 2014]
        '115342479',
        //[This video doesn't have a single title, 2015 [from saved personal videos from snapchat between october 2014 and october 2015 for Backs To The Future, Five Years Gallery, 2015]
        '263420201',
        //We are a winner, 2016 [Interruptions on YouTube]
        '263423292',
        //In General Terms, 2016 [Interruptions for the Field Broadcast and Bad Vibes Interruptions app with Matthew de Kersaint Giraudeau
        '263422702',
        //A short video as Consent, 2016-2017 [Revised consent video from Field Broadcast app]
        '263422691',
        //End Game, 2017 [for Synthetic Ecology at ONCA, Brighton]
        '263421324',
           ];
    var index = Math.floor(Math.random() * videos.length);
    var html ='<iframe src="https://player.vimeo.com/video/' + videos[index] + '?autoplay=1" width="100%" height="70%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
    document.querySelector('.embed').innerHTML = html;
// Texts
//var r_text = new Array ();
//r_text[0] = "array text one";
//r_text[1] = "array text two";
//var i = Math.floor(2*Math.random())
//document.write('<array>' + r_text[i] + '</array>');
