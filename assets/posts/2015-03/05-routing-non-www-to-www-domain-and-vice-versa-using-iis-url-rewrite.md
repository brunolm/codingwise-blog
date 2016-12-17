---
layout: post
title: "Routing non-www to www domain and vice versa using IIS URL Rewrite"
date: 2015-03-05 12:00:00 -0300
categories: code
tags:
  - domain
  - iis
  - url-rewrite
---
If you have a domain and you want to refer to it in a single way, either with or without `www` you can use [IIS URL Rewrite](http://www.iis.net/downloads/microsoft/url-rewrite) to redirect requests.

IIS URL Rewrite is a module that supports configurations from your `web.config` file to manipulate URLs. With it you can easily redirect from a non-www domain to a www domain.

You might think that `yourwebsite.com` looks shorter and cleaner, and I would agree of course, however if you want to aim to a high performance website you will have to reconsider.
<!--more-->

When you use a `non-www` domain you are putting cookies on the all catching domain. It means that for each static image on your website you would also be serving a huge session cookie along with it. The good side of using `www` is that you can isolate cookies in this subdomain and have a separated subdomain (cookie free and heavily cached) to serve static content.

```
www.yourdomain.com
static.yourdomain.com
```

Jeff Atwood (Stack Overflow co-founder) [once posted](http://blog.codinghorror.com/the-great-dub-dub-dub-debate/):
<blockquote>WARNING: If you pick the domain example.com, be aware that all cookies you store on that domain will be sent to all subdomains  forever. This is a major downside I didnt discover until years later, and its big enough to make me regret choosing stackoverflow.com versus www.stackoverflow.com.</blockquote>

Stack Exchange overcame this issue by creating a dedicated domain to serve static content only.

Enough with talk lets get to the code. Once you have the module installed you can just add on your `web.config` under `system.webServer` tag the following:

**Converting non-www to www** *make sure to update domain suffix
```
<rewrite>
  <rules>
    <rule name="Canonical" stopProcessing="true">
      <match url=".*" />
      <conditions>
        <add input="{HTTP_HOST}" pattern="^([a-z]+[.]com)$" />
      </conditions>
      <action type="Redirect" url="http://www.{C:0}/{R:0}"
          redirectType="Permanent" />
    </rule>
  </rules>
</rewrite>
```

**Converting www to non-www**
```
<rewrite>
  <rules>
    <rule name="Canonical" stopProcessing="true">
      <match url=".*" />
      <conditions>
        <add input="{HTTP_HOST}" pattern="^www[.](.+)" />
      </conditions>
      <action type="Redirect" url="http://{C:1}/{R:0}"
          redirectType="Permanent" />
    </rule>
  </rules>
</rewrite>
```
