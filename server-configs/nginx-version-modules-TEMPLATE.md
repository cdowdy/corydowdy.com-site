# Nginx Version and Modules built in  

* NginX Version: nginx/1.6.2  
* TLS SNI support enabled  

* configure arguments:
  * --add-module=/home/*userName*/naxsi-0.53-2/naxsi_src  
  * --prefix=/usr/share/nginx
  * --sbin-path=/usr/sbin/nginx
  * --conf-path=/etc/nginx/nginx.conf
  * --pid-path=/var/run/nginx.pid
  * --lock-path=/var/lock/nginx.lock
  * --error-log-path=/var/log/nginx/error.log
  * --http-log-path=/var/log/access.log
  * --user=www-data
  * --group=www-data
  * --without-mail_pop3_module
  * --without-mail_imap_module
  * --without-mail_smtp_module
  * --with-http_gzip_static_module
  * --with-http_gunzip_module
  * --with-http_stub_status_module
  * --with-http_ssl_module
  * --with-http_spdy_module
  * --with-http_gzip_static_module
  * --add-module=/home/*userName*/ngx_pagespeed-release-1.9.32.1-beta
  * --add-module=/home/*userName*/headers-more-nginx-module-0.25
