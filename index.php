<?php
// Simple check page so you know PHP is running on Render
?><!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><title>PHP OK</title></head>
<body>
<h1>Render PHP is running ✅</h1>
<p>Try the viewer: <a href="/form-viewer.php">/form-viewer.php</a></p>
</body></html>
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
