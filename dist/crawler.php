<html>
<head>
    <?php
        $string = file_get_contents("description.json");
        $json = json_decode($string,true);
        $parts = preg_split("/\//", $_GET['hash']);
        $title = '';
        $keywords = '';

        $size = sizeof($parts);

        if( sizeof($parts) > 1 && isset($json[$parts[1]]) ) {
            $title = $json[$parts[1]]['title'];
            $keywords = $json[$parts[1]]['keywords'];
        }
    ?>

    <title>Fauna - <?php echo $title ?></title>
    <meta name="description" content="Wild Cartoons from the Animal Kingdom.  A collection of animal and biology cartoons and comics inspired by nature, illustrated by Greg Bishop">
    <meta name="keywords" content="<?php echo $keywords ?>" />
</head>
<body>
    <div itemscope itemtype="http://schema.org/CreativeWork">
        <h1 itemprop="publisher" itemtype="http://schema.org/Organization" itemscope>
            <span itemprop="name">Fauna Cartoons</span>
        </h1>
        <h2 itemprop="name"><?php echo $title ?></h2>
        <img itemprop="image" alt="<?php echo $title ?>" src="/comics/fauna/regular/Fauna_<?php echo $parts[1] ?>.jpg" />
        <div>
            By, <span itemprop="author">Greg Bishop</span>
        </div>
        <span style="display:none" itemprop="keywords"><?php echo $keywords ?></span>
    </div>
</body>
</html>