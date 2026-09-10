# Retiring cristiancusu.netlify.app

The old portfolio is still live and still indexed. Two portfolios competing for
the same name means a recruiter can land on the outdated one, the one that does
not mention Mercedes-Benz, VR, or the Blender addons.

This folder replaces that site with redirects. It does not delete anything.

## Why redirect instead of delete

Deleting the site makes every old URL 404. Search engines drop them eventually,
and any link that exists anywhere, in a CV sent two years ago or an ArtStation
profile, breaks.

A permanent redirect hands the old URLs' standing to the new site and sends real
visitors to the right page. The 14 old case study URLs are mapped individually,
so a bookmark to the SpongeBob post lands on the SpongeBob case study rather
than the homepage.

## How to deploy it

The original repository for that site is gone, so this is a manual deploy.

1. Open https://app.netlify.com and pick the `cristiancusu` site.
2. Go to **Deploys**.
3. Drag this whole folder onto the drop zone at the bottom of the page.

That publishes a site containing only `_redirects` and a fallback page. Netlify
applies the rules at the edge, before it looks for a file.

If the site is still linked to a Git repository, Netlify will warn that a manual
deploy takes over. That is fine and is what we want: nothing is going to build
from that repository again.

## Then check it

    curl -sI https://cristiancusu.netlify.app/posts/f8a29532 | head -3

Expect `301` and a `location` of
`https://cusu-dev.vercel.app/work/ohbb-kart-spongebob`.

## Afterwards

In Google Search Console, if the old property is verified, submit a change of
address. Without it the redirects still work, they are just honoured more
slowly.
