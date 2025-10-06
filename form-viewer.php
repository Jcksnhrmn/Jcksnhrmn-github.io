<?php
// form-viewer.php — clean version

// (Optional) show errors while setting up
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Pick the incoming data depending on request method
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$data   = ($method === 'POST') ? $_POST : $_GET;

// helper to escape output
function h($v) {
  return htmlspecialchars((string)$v, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}
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
    h1{
