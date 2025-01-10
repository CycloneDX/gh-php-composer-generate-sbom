> [!NOTE]
> This GitHub Action is considered deprecated.  
> Instead, you may use the underlying tool directly:
>
> ```yaml
> # setup you PHP and composer first - here is an example:
> - name: Setup PHP
>   uses: shivammathur/setup-php@v2
>    with:
>     extensions: dom,json,libxml
>     tools: 'composer:v2'
> 
> - name: Install SBOM composer plugin 
>   run: |-
>     composer global config --no-plugins allow-plugins.cyclonedx/cyclonedx-php-composer true
>     composer global require cyclonedx/cyclonedx-php-composer
> 
> - name: Create SBOM step
>   # see for usage: https://packagist.org/packages/cyclonedx/cyclonedx-php-composer
>   run: composer CycloneDX:make-sbom --help
> ```

----

# GitHub action to generate a CycloneDX SBOM for PHP Composer projects

[![Website](https://img.shields.io/badge/https://-cyclonedx.org-blue.svg)](https://cyclonedx.org/)
[![Slack Invite](https://img.shields.io/badge/Slack-Join-blue?logo=slack&labelColor=393939)](https://cyclonedx.org/slack/invite)
[![Group Discussion](https://img.shields.io/badge/discussion-groups.io-blue.svg)](https://groups.io/g/CycloneDX)
[![Twitter](https://img.shields.io/twitter/url/http/shields.io.svg?style=social&label=Follow)](https://twitter.com/CycloneDX_Spec)


## Example usage

```yaml
uses: CycloneDX/gh-php-composer-generate-sbom@v1
```

## Internals

This action utilizes `cyclonedx/cyclonedx-php-composer:<4`. See [`cyclonedx/cyclonedx-php-composer` on Packagist](https://packagist.org/packages/cyclonedx/cyclonedx-php-composer).
