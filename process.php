<?php
require __DIR__ . '/vendor/autoload.php';

use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;

#$process = new Process(['node', 'index.js']);
$process = Process::fromShellCommandline('node index.js');

$process->run();

// executes after the command finishes
if (!$process->isSuccessful()) {
    throw new ProcessFailedException($process);
}

$output = $process->getOutput();

$array = json_decode($output, true);

var_dump($array);