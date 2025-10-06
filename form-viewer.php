// Pick the incoming data depending on request method


// helper to escape output

function h($v) { return htmlspecialchars((string)$v, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'); }


?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Form Viewer</title>
<style>
:root{ --ink:#111827; --muted:#6b7280; --border:#e5e7eb; --bg:#f8fafc; --accent:#0ea5e9; }
body{ font-family: system-ui, Arial, sans-serif; background: var(--bg); color: var(--ink); margin:0; }
header{ background:white; border-bottom:1px solid var(--border); padding:1.25rem; }
h1{ margin:.25rem 0; }
main{ max-width: 960px; margin: 1.5rem auto; padding: 0 1rem 2rem; }
table{ width:100%; border-collapse: collapse; background:white; border:1px solid var(--border); border-radius: 14px; overflow:hidden; box-shadow: 0 10px 30px rgba(0,0,0,.06); }
thead th{ text-align:left; background:#f1f5f9; padding:.85rem 1rem; font-size:.95rem; border-bottom:1px solid var(--border); }
tbody td{ padding:.85rem 1rem; border-bottom:1px solid var(--border); vertical-align: top; }
tr:last-child td{ border-bottom:none; }
.key{ font-weight:700; }
.array{ display:inline-block; padding:.25rem .5rem; margin:.2rem; background:#eff6ff; border:1px solid #dbeafe; border-radius: 999px; font-size:.85rem; }
.meta{ color:var(--muted); font-size:.9rem; }
.empty{ color:#9ca3af; font-style: italic; }
.btns{ margin: 1rem 0; display:flex; gap:.5rem; }
a.btn{ display:inline-block; padding:.6rem .9rem; background:var(--accent); color:white; font-weight:700; border-radius:12px; text-decoration:none; }
</style>
</head>
<body>
<header>
<h1>Form Viewer</h1>
<p class="meta">Request method: <strong><?php echo h($method); ?></strong></p>
</header>
<main>
<div class="btns">
<a class="btn" href="index.html">Back to Form</a>
</div>


<?php if (empty($data)) : ?>
<p class="empty">No data was submitted. Try going back and filling out the form.</p>
<?php else: ?>
<table>
<thead>
<tr>
<th>Field (name)</th>
<th>Value</th>
</tr>
</thead>
<tbody>
<?php foreach ($data as $key => $value): ?>
<tr>
<td class="key"><?php echo h($key); ?></td>
<td>
<?php if (is_array($value)): ?>
<?php if (count($value) === 0): ?>
<span class="empty">(empty array)</span>
<?php else: ?>
<?php foreach ($value as $item): ?>
<span class="array"><?php echo h($item); ?></span>
<?php endforeach; ?>
<?php endif; ?>
<?php else: ?>
<?php echo ($value === '' ? '<span class="empty">(empty)</span>' : h($value)); ?>
<?php endif; ?>
</td>
</tr>
<?php endforeach; ?>
</tbody>
</table>
<?php endif; ?>
</main>
</body>
</html>
