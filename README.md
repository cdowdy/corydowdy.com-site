Site Theme For CoryDowdy.com
====  
```blog-posts```: templates and actual posts for blog page  
```favicons```: well....favicons :)  
```pages```: page templates for each page on site  
```theme```: is it all put together  
Projects Used In this theme:
-----
* Built On Bolt CMS
  * [bolt website](http://bolt.cm)
  * [bolt github](https://github.com/bolt/bolt) 
* Foundation 5
  * [Foundation 5](http://foundation.zurb.com/) 
  * [Foundation  Github](https://github.com/zurb/foundation)
* Picturefill By Scott Jehl
  * [Picturefill Github](https://github.com/scottjehl/picturefill)
* Parsley Js form validation:
  * [Parsley Github](https://github.com/guillaumepotier/Parsley.js/)
  * [Parsley Home Page](http://parsleyjs.org/)
* Enhance by the Filament Group for async loading of JavaScript and CSS
  * [Enhance Github Page](https://github.com/filamentgroup/enhance)   


Base Template
-------------  
Located in ```theme/CoryDowdy/base.html.twig```  

To use a Block in a child page (meaning: not in ```base.html.twig``` but in say ```about.html.twig```) use the twig tag with the corresponding block.  
```{% block stylesheets %}```  

To keep what is included inside the base template block in a child template block use the twig tag  
```{{ parent() }}```  

```HTML
{% block javascripts %}
  {{ parent() }}  
  <script src="your-script.js" async defer></script>  
{% endblock javascripts %}  
```  

To use Enhance JS grab your global inlined styles and place them in the ```stylesheets``` block.   
```HTML
{% block stylesheets %}  

  {% block fout %}
  <!-- 
    Flash of unstyled text styles go here.  
    Typekit is .wf-loading
  -->  
  {% endblock fout %}
  <!-- check to see if the cookie from enhance js has been set.-->
  {% if app.request.cookies.has('fullcss') %}  
  <link rel="stylesheet" href="{{ paths.theme}}css/app.min.css"/>
  {% else %}  
    {% block inlined_styles %}  
    <!--  
      No cookie set. use these inlined styles.
    -->
    {% endblock %}
  {% endif %}
{% endblock %}
```
