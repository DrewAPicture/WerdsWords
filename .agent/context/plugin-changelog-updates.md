# Plugin Changelog Updates

Three actively-maintained plugins have changelog sections in their Eleventy page files. When updating them, retrieve the latest changelog data from WordPress.org and update the relevant page file under `pages/` (once pages are created from `wp-export-pages/`).

## Plugins

| Plugin | Page file | WordPress.org changelog URL |
|---|---|---|
| Jazzy Generator Tag | `pages/jazzy-generator-tag.md` | https://wordpress.org/plugins/jazzy-generator-tag/#developers |
| Press This New Post | `pages/press-this-new-post.md` | https://wordpress.org/plugins/press-this-new-post/#developers |
| Redirect Link Format | `pages/redirect-link-format.md` | https://wordpress.org/plugins/redirect-link-format/#developers |

**Remove Dashboard Access** and **Support Me** were sold and are no longer maintained by Drew. Do not update their changelogs.

## How to update

1. Fetch the `#developers` tab URL for the plugin (e.g. `https://wordpress.org/plugins/jazzy-generator-tag/#developers`)
2. Extract the changelog entries — they appear under a "Changelog" heading as a version-by-version list
3. Reconcile against the existing changelog in the page file: add any versions not already listed, newest first
4. Do not reformat or remove existing entries

## Notes

- The `#developers` anchor may not affect the fetched content depending on how the page is rendered; the full changelog is typically present in the page source regardless
- Jazzy Generator Tag uses mirror versioning (version number matches the latest supported WordPress version), so new entries will follow that pattern
