var express = require('express');
var bodyParser =require('body-parser');

var articles = [
    {
        id: '1',
        title: 'chromonicci – Anticipate (Future Vibes x phuture collective)',
        summary: 'Every once in awhile we come across a track that must be blogged about here. Last time it was gahn. with ‘Airtime’ and this time you’ll be hearing from ‘chromonicci.’ with his track ‘Anticipate’.',
        createdAt: new Date('2017-01-25T24:00:00'),
        author: 'Phuture collective',
        content: 'Every once in awhile we come across a track that must be blogged about here. Last time it was gahn. with ‘Airtime’ and this time you’ll be hearing from ‘chromonicci.’ with his track ‘Anticipate’. This was our first co-release of the year but not the last! This co-release was between us and Future Vibes, who have been releasing top notch quality tunes the past few months. Give the track a listen here!'
    },
    {
        id: '2',
        title: 'Indi- go goes swamp',
        summary: 'Indigo Beck brings a baked cilantro fire to his sound and doesn’t mind giving us an interview while standing in a very small box, much like a cat. His track “Swamp” is suggestive of multidimensional traveling, at midnight of course.',
        createdAt: new Date('2017-01-09T24:00:00'),
        author: 'Phuture collective',
        content: 'Indigo Beck brings a baked cilantro fire to his sound and doesn’t mind giving us an interview while standing in a very small box, much like a cat. His track “Swamp” is suggestive of multidimensional traveling, at midnight of course. Listen to “Swamp” by Indigo Beck here: https://soundcloud.com/phuturecollective'
    },
    {
        id: '3',
        title: 'issue seven | MIDNIGHT',
        summary: 'Each instance the clock strikes MIDNIGHT we are presented with a scene. A dark moment to feel one with ourselves, to dream in the shadows. To take a trip to the unknown.',
        createdAt: new Date('2017-01-12T24:00:00'),
        author: 'Phuture collective',
        content: 'Each instance the clock strikes MIDNIGHT we are presented with a scene. A dark moment to feel one with ourselves, to dream in the shadows. To take a trip to the unknown. Stream Issue Seven here: https://soundcloud.com/phuturecollective/sets/issue-seven'
    },
    {
        id: '4',
        title: 'Belluga',
        summary: 'It is with euphoric, harmonic & gracious vibrations with which we present you the following: Belluga. A collaboration between Portland based artists Pacific Patterns & TAWRENCE .',
        createdAt: new Date('2016-11-26T24:00:00'),
        author: 'Phuture collective',
        content: 'It is with euphoric, harmonic & gracious vibrations with which we present you the following: Belluga. A collaboration between Portland based artists Pacific Patterns & TAWRENCE .Time; immemorial, undeterred, incandescent. Where the soul met the star upon the birth of the heavens. The cadence comes, calling from across the distance engineered by its own bravado, inviting every unchecked flame to gather in the folds of its fire. Built to absorb the hum of the universe, the frenzied synergy rises to meet its rate; steady, steadier still. To the flightless, as a memory of this until it again can be reached; packaged and presented as the distance it engineered, in the form of a beating heart. (-Megyn Van Wyk.). Stream "Belluga" here: https://soundcloud.com/phuturecollective/pacific-patterns-x-tawrence-belluga'
    },
    {
        id: '5',
        title: 'ILIUM x phuture collective: Gahn. – Airtime',
        summary: 'Check out the latest from ILIUM & us featuring Gahn',
        createdAt: new Date('2016-08-28T24:00:00'),
        author: 'Phuture collective',
        content: 'Check out the latest from ILIUM & us featuring Gahn. This smooth electronic tune is best enjoyed Here & Now in the present moment. Enjoy the vibrations that await! Listen to airtime  here:https://soundcloud.com/iliumcollective/nickv-airtime'
    },
    {
        id: '6',
        title: 'DEORRO DROPS A NEW SINGLE AND SPILLS THE DETAILS ON HIS DEBUT ALBUM',
        summary: 'Deorro is getting the weekend underway with the release of a new single as well as a major announcement. The Panda Funk frontrunner offered up his latest exercise in bounce with "Rise and Shine," a funky number that serves as our first taste of Deorro\'s upcoming debut album!',
        createdAt: new Date('2017-03-04T24:00:00'),
        author: 'Edm.com',
        content: 'Deorro is getting the weekend underway with the release of a new single as well as a major announcement. The Panda Funk frontrunner offered up his latest exercise in bounce with "Rise and Shine," a funky number that serves as our first taste of Deorro\'s upcoming debut album!"Rise and Shine" sees Deorro returning to the bounce roots that first brought him to prominence after taking some new directions on his last release. The track kicks off with a shuffling drum beat, quickly joined by a jaunty stand up bass riff and ragtime piano melodies. The producer juxtaposes the sampled instruments against driving electro beats and jubilant vocal chops, delivering the kind of top notch bounce drops his fans have come to expect.On to the big announcement, Deorro has revealed that his debut album Good Evening will be released on March 31. The album will feature a total of 24 tracks that combine to form an ambitious, genre-spanning concept album that Deorro has spent the last three years creating. It\'s definitely exciting news for one of dance music\'s brightest producers. Check out "Rise and Shine" below, and head here to grab a pre-order of Deorro\'s upcoming album. https://soundcloud.com/deorro/rise-and-shine-1'
    },
    {
        id: '7',
        title: 'CASPA DROPS A TRIPPY VIDEO FOR NEW SINGLE "GET HIGHER"',
        summary: 'Dubstep originator Caspa is back with a fresh bass heavy offering this weekend with the release of his new single "Get Higher." The UK producer is back with a vengeance on the new release, which sees him dropping a standout track that will rattle your subwoofers.',
        createdAt: new Date('2017-03-04T24:00:00'),
        author: 'Edm.com',
        content: 'Dubstep originator Caspa is back with a fresh bass heavy offering this weekend with the release of his new single "Get Higher." The UK producer is back with a vengeance on the new release, which sees him dropping a standout track that will rattle your subwoofers.Musically, "Get Higher" strikes a balance between reviving the dubstep sounds of old and pushing the genre forward with news ideas. The new tune kicks off with cavernous drums and an ethereal vocal sample. Caspa punctuates the drifty intro with a sustained screech, leading into a powerful drop complete with stop start rhythms and head twisting sound design.In conjunction with the new single, Caspa teamed up with Video Content Factory to release a music video for "Get Higher." The visuals are psychedelic and a bit indecipherable, pairing up perfectly with the music\'s hallucination inducing sound.Caspa\'s latest release arrives as a strong offering from the producer and is the perfect way to bass boost your weekend. Check out the "Get Higher" video below. https://www.facebook.com/caspaofficial/videos/10155020035267410/'
    },
    {
        id: '8',
        title: 'SKRILLEX OFFICIALLY REJOINS FORMER BAND FROM FIRST TO LAST',
        summary: 'After a sudden rush of activity throughout early 2017, Skrillex has officially reunited with his former band From First To Last.',
        createdAt: new Date('2017-03-02T24:00:00'),
        author: 'Edm.com',
        content: 'After a sudden rush of activity throughout early 2017, Skrillex has officially reunited with his former band From First To Last.Fans were first treated to a new single from the band in January titled "Make War" that saw Sonny Moore reprising his role as vocalist, followed by his first performance with From First To Last in ten years for Emo Nite LA in February. Fans of the group began to speculate over the possibility of a more permanent reunion, and it looks like their hopes have come true.Taking to social media over the weekend, From First To Last tweeted an image of the band, now restored to a full four piece outfit complete with Skrillex front and center. The group were a staple of the emo scene when Moore departed in 2007 to pursue his Skrillex side project, which went on to become one of the most influential names in contemporary electronic music.'
    },
    {
        id: '9',
        title: 'DEADMAU5 SHARES RELEASE DATE FOR HIS UPCOMING ALBUM, ‘STUFF I USED TO DO\'',
        summary: 'Late last November of 2016, Joel Zimmerman aka deadmau5, began hinting about a pet project which would follow the release of his December album ‘W:/2016Album/’.',
        createdAt: new Date('2017-02-17T24:00:00'),
        author: 'Edm.com',
        content: 'Late last November of 2016, Joel Zimmerman aka deadmau5, began hinting about a pet project which would follow the release of his December album ‘W:/2016Album/’.Now, after much anticipation, deadmau5 has finally shared details about the upcoming album\'s release date. On February 10th, deadmau5 announced through the Mau5trap Instagram account that his album ‘Stuff I Used to Do’ will be released on February 24th.The 20-track collection will include remastered hits from deadmau5\'s early career spanning through 1998 to 2007. The new album will also include new unreleased tracks as well as older songs such as "Creep". It has been reported that the new album will be released as a free download. You can check out the seven-hour live stream below, to get a vibe of what will be on the new album. Get ready to hang back and watch while Deadmau5 remasters old track'
    },
    {
        id: '10',
        title: 'THE CHAINSMOKERS REFLECT ON THE IMPORTANCE OF KINDNESS FOLLOWING FAN\'S PASSING',
        summary: 'Music has the ability to touch our lives in profound ways, by giving us lyrics and melodies that we can hum along to in moments of joy as well as enable us to feel some of the most deep-feeling emotions through difficult times.',
        createdAt: new Date('2017-02-17T24:00:00'),
        author: 'Edm.com',
        content: 'Music has the ability to touch our lives in profound ways, by giving us lyrics and melodies that we can hum along to in moments of joy as well as enable us to feel some of the most deep-feeling emotions through difficult times.For musicians, fan interaction can also have a strong emotional impact knowing that their music directly affects the lives of the audiences who queue up in line for hours just to see their favorite artists. This was the case for EDM duo The Chainsmokers who recently reflected on a deeply touching, if not incredibly sorrowful moment with a young fan and his family. The Chainsmoker\'s Alex Pall took to Twitter to share his his deep-rooted feelings after hearing the unfortunate news of a young fan\'s passing after a hard-fought battle with cancer.There is so much in our lives that we cannot control, but one thing that is directly in our power is the way that we treat every person that we interact with. An act of kindness, no matter how big or how small has the power to contribute positivity in the world around us. Cherish each moment with friends, family, and loved ones because the future isn\'t guaranteed.'
    },
    {
        id: '11',
        title: 'Lorem Ipsum',
        summary: 'Classics',
        createdAt: new Date('2017-02-20T24:00:00'),
        author: 'Lorem ipsum',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
    },
    {
        id: '12',
        title: 'Lorem Ipsum from Generator pt1',
        summary: 'Generated',
        createdAt: new Date('2017-02-20T24:00:00'),
        author: 'Lorem ipsum',
        content: 'Maecenas laoreet efficitur orci, eu dignissim tortor pharetra eu. Morbi sit amet purus et diam pellentesque finibus quis sed orci. Morbi tellus velit, mattis ac eleifend ac, scelerisque sed ex. Aliquam lacus arcu, pulvinar sed nibh non, facilisis fringilla massa. Phasellus neque neque, tristique in ligula a, blandit cursus arcu. Nulla volutpat a odio et rutrum. Praesent convallis placerat lectus id efficitur. Nullam convallis ultrices orci quis sollicitudin. Maecenas feugiat est vitae velit malesuada luctus. Nam eget condimentum ante, vestibulum molestie massa. Aenean mattis nisl odio, a dictum arcu tempor vel. Suspendisse scelerisque est sit amet convallis finibus. Ut et nisi a mauris dapibus venenatis sit amet et mi.Vivamus euismod vitae urna non porta. Nam tristique orci non ultrices finibus. Donec a lobortis tellus, at faucibus ligula. In quis aliquam neque. Nunc dignissim mattis leo, et finibus risus gravida vel. Maecenas nec neque dui. Mauris porttitor finibus arcu ut venenatis. Nulla tempor in turpis in laoreet. Morbi blandit felis eros, ut facilisis risus vulputate vel. Sed hendrerit dictum nunc, eget euismod lorem consectetur nec.'
    },
    {
        id: '13',
        title: 'Lorem Ipsum from Generator pt2',
        summary: 'more generated',
        createdAt: new Date('2017-02-12T24:00:00'),
        author: 'Lorem ipsum',
        content: 'ed eget velit eu odio pellentesque blandit in id erat. Cras dictum, orci quis vestibulum aliquet, turpis sem faucibus ex, vel vestibulum massa massa vitae massa. Donec faucibus interdum elit in pharetra. Fusce odio ante, imperdiet vel turpis eu, ornare rhoncus urna. Morbi nec eleifend tellus, in gravida nibh. Integer condimentum finibus quam nec semper. Ut nec nibh eleifend, pretium ex ut, ornare tellus. Integer viverra, erat dapibus congue aliquet, arcu sem sagittis augue, eu dignissim nulla metus sit amet felis. Mauris iaculis est mauris, vel volutpat purus congue et.Integer a blandit ante. Vivamus a sagittis tellus, a pharetra nibh. Donec mollis augue at ex lobortis posuere. Nam a ante vitae enim dictum efficitur in sit amet quam. Integer vel ornare enim. Nulla non lobortis quam. Morbi quis rhoncus tellus, in tincidunt nisl.'
    },
    {
        id: '14',
        title: 'Lorem Ipsum from Generator pt3',
        summary: 'more generated',
        createdAt: new Date('2017-02-05T24:00:00'),
        author: 'Lorem ipsum',
        content: 'Integer elit nisi, gravida at neque sit amet, molestie laoreet dui. Ut fringilla faucibus neque in maximus. Fusce vel sem in sem dictum congue. Quisque iaculis maximus sem eu imperdiet. Nulla facilisi. Aliquam rhoncus dapibus ex a rhoncus. Ut nulla diam, pellentesque at ultricies eu, interdum eu libero. Quisque euismod ex arcu, vel fringilla lectus ornare at. Nam pellentesque tellus non libero bibendum, vitae finibus orci porttitor. Praesent rhoncus nibh sed ex pulvinar, vitae euismod sem pretium. Donec nec placerat magna. Phasellus urna ligula, tempus eget euismod in, pulvinar nec sapien. Nunc lacinia id nibh vitae placerat.Sed ac ultricies felis. Curabitur eget viverra lectus. Aliquam ut mauris non arcu tristique pharetra a sit amet purus. Sed interdum ipsum eu euismod mattis. Phasellus ipsum augue, aliquam id neque non, tincidunt ultricies orci. In at dignissim dui. Praesent vel pharetra est. Proin neque tellus, posuere ut malesuada quis, finibus ut quam. Vestibulum posuere lacus id eros tristique malesuada. Nam lobortis semper scelerisque.'
    },
    {
        id: '15',
        title: 'Lorem Ipsum from Generator pt4',
        summary: 'more generated',
        createdAt: new Date('2017-02-01T24:00:00'),
        author: 'Lorem ipsum',
        content: 'Vivamus in mauris iaculis, dignissim augue ac, commodo dui. Vivamus ut malesuada dui. Nullam ac est mauris. Etiam eleifend justo sit amet ullamcorper vestibulum. Nunc nisi tortor, pharetra quis nunc id, hendrerit convallis risus. Praesent sagittis orci vel pretium consectetur. Sed fermentum velit mauris, et rhoncus elit imperdiet a. Phasellus consectetur vitae tellus et ultricies. Donec erat elit, ultrices pretium enim nec, consequat mollis enim. Fusce egestas egestas placerat. Suspendisse vehicula, quam lobortis rhoncus gravida, leo dolor imperdiet purus, at luctus magna ipsum sed ex. Maecenas luctus gravida felis, non interdum mi ultricies vitae. Ut mattis leo et nunc congue, sollicitudin rutrum est commodo. Donec vehicula erat in tellus ultrices, ut posuere massa rutrum. Phasellus ut maximus augue.Mauris molestie ultrices bibendum. Quisque sit amet aliquet mauris. In hac habitasse platea dictumst. Nam quis eros vitae tellus sollicitudin aliquam. Proin ac urna at ipsum suscipit iaculis quis vitae arcu. Vivamus eleifend, urna mollis laoreet auctor, risus turpis pharetra nisi, a sagittis nunc nulla id ipsum. Sed id risus nisl. Sed at purus ornare, egestas orci et, finibus neque. Nunc quis mauris risus. Sed condimentum efficitur neque, ut auctor orci.'
    },
    {
        id: '16',
        title: 'Lorem Ipsum from Generator pt4',
        summary: 'more generated',
        createdAt: new Date('2017-01-24T24:00:00'),
        author: 'Lorem ipsum',
        content: 'In quis semper lectus. Quisque eu aliquet turpis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus elementum aliquet odio, quis malesuada mauris ultrices quis. Pellentesque ut velit vehicula, porta sem eget, tincidunt augue. Aenean quis lacus sed mi pellentesque vulputate elementum sit amet dui. Suspendisse id tellus dictum, lobortis neque vitae, efficitur arcu. Donec eget mi ut orci vestibulum efficitur sed id nulla. Donec maximus pharetra nisi, at viverra justo porttitor at. Proin mollis augue nisi. Nullam gravida quam in ultricies pellentesque. Cras fringilla, velit quis interdum dapibus, lectus tortor ultricies urna, a sodales ante libero id nisl. Sed id volutpat mi. Sed quis ultrices diam. In id odio nec est faucibus sagittis ut eu neque.Morbi vel nibh vitae nisi ultricies laoreet sed commodo est. Suspendisse potenti. Ut nunc purus, scelerisque in orci quis, cursus dapibus eros. Aliquam quis tortor efficitur, tempor orci non, lacinia arcu. Ut sollicitudin id arcu vel imperdiet. Cras iaculis consectetur ante ac elementum. Mauris et euismod est.'
    },
    {
        id: '17',
        title: 'Lorem Ipsum from Generator pt5',
        summary: 'more generated',
        createdAt: new Date('2017-01-21T24:00:00'),
        author: 'Lorem ipsum',
        content: 'Nunc suscipit luctus pulvinar. Vivamus interdum mi ipsum, placerat dictum leo aliquam a. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque sed lectus vel leo dignissim ultricies. Morbi vel ligula massa. Suspendisse ut mauris euismod, feugiat purus ut, tincidunt ipsum. Phasellus luctus dignissim viverra. Donec fermentum quam at risus laoreet egestas. Pellentesque eleifend sed diam quis varius. Donec vel posuere enim, id elementum metus. Ut feugiat sapien in sollicitudin tincidunt. Donec luctus ipsum vel lectus laoreet porta. Nullam vitae quam fermentum, placerat erat sed, sollicitudin urna. Cras non rutrum velit. Vestibulum suscipit massa ut finibus tincidunt. Curabitur arcu leo, tempor eu ex vel, suscipit porttitor tellus.Quisque hendrerit accumsan sapien ac malesuada. Maecenas interdum accumsan justo. Praesent posuere tincidunt pulvinar. Aenean rutrum, sem ut fermentum imperdiet, quam tellus finibus ex, ut egestas diam quam ut tellus. Sed fringilla sapien est, ac tempor elit fringilla nec. Suspendisse nec lobortis libero, feugiat placerat enim. Aliquam erat volutpat. Curabitur hendrerit pretium sem, id laoreet justo tincidunt eget.'
    },
    {
        id: '18',
        title: 'Lorem Ipsum from Generator pt6',
        summary: 'more generated',
        createdAt: new Date('2017-01-15T24:00:00'),
        author: 'Lorem ipsum',
        content: 'Cras placerat, sapien et tincidunt sodales, dolor mauris gravida mauris, ut vulputate augue arcu nec lorem. Suspendisse id sem eu lectus ornare semper. Nam mattis ipsum vitae augue luctus, vel interdum velit imperdiet. Aliquam tortor sem, lacinia et tincidunt ac, sagittis a risus. Aliquam volutpat enim sit amet quam accumsan dapibus. Quisque in ex non magna suscipit convallis. In id imperdiet nisi. Ut tincidunt rhoncus ante, quis rutrum risus interdum a. Duis hendrerit nibh purus, sit amet accumsan ipsum molestie quis.Quisque neque arcu, facilisis quis sagittis in, tristique at sem. Nulla facilisi. Maecenas pulvinar ipsum dui, ac iaculis nibh pharetra dictum. Fusce quis magna odio. Cras quis commodo nisl, et luctus lectus. Nulla id efficitur ligula, id auctor justo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In blandit molestie porttitor. Phasellus at feugiat est, in tempus sem. Quisque quis nisl velit. Curabitur quis egestas felis, id tristique urna.'
    },
    {
        id: '19',
        title: 'Lorem Ipsum from Generator pt7',
        summary: 'more generated',
        createdAt: new Date('2017-01-13T24:00:00'),
        author: 'Lorem ipsum',
        content: 'Praesent porttitor lectus id lacus ultricies, non faucibus orci pellentesque. Vivamus magna risus, pharetra non ipsum nec, tincidunt viverra leo. Vivamus lobortis id lacus sit amet egestas. Aenean hendrerit lectus justo, at gravida lacus hendrerit at. Donec finibus felis ac ipsum volutpat scelerisque. Nulla sollicitudin ac massa at convallis. Vestibulum ultricies augue lorem, id mattis arcu pellentesque ac.Cras tortor nisl, porttitor pulvinar augue in, euismod gravida orci. Curabitur sed lectus odio. Phasellus vestibulum, lectus fringilla malesuada tempus, enim libero condimentum turpis, ac tristique odio mauris in massa. Sed iaculis ipsum quam, ut ultrices elit interdum eget. Nulla posuere a nulla at commodo. Sed aliquam ultricies pellentesque. Ut nec neque erat. Aenean porttitor luctus diam, eget mollis felis posuere sed. Sed iaculis venenatis ultricies. Vestibulum est metus, efficitur vel ipsum in, accumsan fermentum nulla. Donec et est vel metus ornare venenatis.'
    },
    {
        id: '20',
        title: 'Lorem Ipsum from Generator pt8',
        summary: 'more generated',
        createdAt: new Date('2017-01-25T24:00:00'),
        author: 'Lorem ipsum',
        content: 'Donec diam dui, facilisis eget leo nec, facilisis viverra velit. Pellentesque nec consectetur magna, vel maximus velit. Nunc interdum iaculis mi, sit amet rhoncus nibh faucibus sed. Etiam pharetra nulla eget erat rutrum luctus. Etiam erat enim, auctor ac posuere sed, interdum ac mauris. Donec ac viverra orci. In hac habitasse platea dictumst. Nam nec placerat diam, et ornare magna.Duis ullamcorper tellus purus, vel tincidunt mi aliquet at. Cras eget rutrum sem, ac venenatis justo. Aliquam eget pharetra odio, non volutpat justo. Vestibulum lobortis rutrum sodales. Vivamus eget urna non odio mattis laoreet sed sed orci. Aenean porta ultrices justo, sit amet dictum nulla tincidunt a. Curabitur in est placerat felis vestibulum interdum non ac odio. Duis posuere egestas leo sed lobortis. In nibh justo, ultrices et imperdiet a, elementum ut erat. Cras luctus elementum diam nec consequat. Praesent ultricies ligula vitae tellus dignissim, tempor dignissim diam volutpat. Proin imperdiet lacus auctor elit porttitor sollicitudin. Curabitur tristique fringilla lobortis.'
    }
];


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(express.static('public'));

app.get('/articles',function (req,res){
    res.send(articles);
})
app.get('/articles/:id', function (req, res) {
	var article=articles.find(function(article){
        return article.id === req.params.id;
    })
})
app.post('/articles', function (req,res){
    var newArticle={
        id: Date.now().toString(),
        title: req.body.title,
        summary: req.body.summary,
        createdAt: req.body.createdAt,
        content: req.body.content,
        img: req.body.img
    }
    articles.push(newArticle);
    res.sendStatus(200);
})
app.put('/articles/:id', function(req,res){
    var article=article.find(function(article){
        return article.id === req.params.id
    });
    article.title=req.body.title;
    article.summary=req.body.summary;
    article.content=req.body.content;
    article.img=req.body.img;
    
    res.sendStatus(200);
})
app.delete('/artists/:id',function(req,res){
    articles=articles.filter(function(article){
        return article.id !== req.params.id;
    })
    res.sendStatus(200);
})


app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});