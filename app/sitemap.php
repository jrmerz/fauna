<?php echo '<?xml version="1.0" encoding="UTF-8"?>' ?>

<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://faunacartoon.com</loc>
        <changefreq>weekly</changefreq>
        <priority>1</priority>
    </url>

<?php

    $files = scandir('comics/fauna/regular/');

    foreach ($files as &$file) {

        if( preg_match('/^Fauna_\d*\.jpg/', $file) ) {
            $file = preg_replace("/Fauna_/", '', $file);
            $file = preg_replace("/\.jpg/", '', $file);

print "  <url>
    <loc>https://faunacartoon.com/#!home/$file</loc>
    <changefreq>weekly</changefreq>
    <priority>1</priority>
  </url>";
echo PHP_EOL;

        }
    }

?>
</urlset>
