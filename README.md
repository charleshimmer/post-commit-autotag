<h1>Post Commit Autotag</h1>

<p>The purpose of this script (written using Node.js) is to be a "Post-Receive URL" that reopens Git Hub issues that were closed by the commit messsage.  Git Hub automatically closes issues that were refenced in a
 commit message like this </p>
<pre><code>
    git commit -m"Fixes #123, typo in url..."
</code></pre>

This script would then re-open issue #123, and apply a label to that issue, like "Testable" or "Verify" (you choose).  It can also handle multiple issues being fixed in a single commit like this.

<pre><code>
    git commit -m"Fixes #123, fixes #234, and closes #456 because of typo in url..."
</code></pre>
