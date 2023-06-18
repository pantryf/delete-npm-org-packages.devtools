Delete NPM packages in an organization.

![](https://i.imgur.com/VaudKyG.jpg)

<br>


First adjust the `executablePath` in `index.js` to point to your Chrome
executable, and `userDataDir` to a directory where Chrome can store its data.
Open Chrome and log in to *NPM*. Then navigate to the *settings page* of a package
in your organization, and enter your *one time password* or *login password* (this
is needed to enter *sudo mode* in NPM).

Then run:

```bash
$ node index.js "<org>"
```

Where `<org>` is the name of the organization you want to delete packages from.
This will open a Chrome window and start by first *scanning* all the package
names. Then it will open a new tab for each package and start deleting packages.
You can *stop* the process at any time by *closing the window*.

<br>
<br>


## References

- [Query Selectors - Puppeteer](https://pptr.dev/guides/query-selectors)
- [ElementHandle class - Puppeteer](https://pptr.dev/api/puppeteer.elementhandle)
- [Connecting Browsers in Puppeteer](https://stackoverflow.com/q/55096771/1413259)
- [Puppeteer detect when the new tab is opened and get page object](https://stackoverflow.com/q/49050003/1413259)
- [Puppeteer Execution context was destroyed, most likely because of a navigation](https://stackoverflow.com/q/55877263/1413259)

<br>
<br>


[![](https://img.youtube.com/vi/cxUWZoirTZk/maxresdefault.jpg)](https://www.youtube.com/watch?v=cxUWZoirTZk)<br>
[![ORG](https://img.shields.io/badge/org-javascriptf-green?logo=Org)](https://javascriptf.github.io)
[![DOI](https://zenodo.org/badge/645461922.svg)](https://zenodo.org/badge/latestdoi/645461922)
