#!/usr/bin/python

import os
import re
import subprocess
import time
import signal

def subprocess_cmd(command):
    process = subprocess.Popen(command,stdout=subprocess.PIPE, shell=True)
    proc_stdout = process.communicate()[0].strip()
    print proc_stdout

def start_bot():
    subprocess.call("node bot.js&", shell=True)

def check_process(process):

    returnprocess = False
    s = subprocess.Popen(["ps", "ax"],stdout=subprocess.PIPE)
    for x in s.stdout:
        if re.search(process, x):
            returnprocess = True

    if returnprocess == False:        
        print 'no process executing'
    if returnprocess == True:
        print 'process executing'
    return returnprocess

def kill_bot():
    p = subprocess.Popen(['ps', 'ax'], stdout=subprocess.PIPE)
    out, err = p.communicate()

    for line in out.splitlines():
        if ('node bot.js' in line):
            pid = int(line.split(None, 1)[0])
            os.kill(pid, signal.SIGKILL)
            print "Killed node bot.js with pid {0}".format(pid)
	  
processExecuting = check_process("node bot.js")

print "Is Planck bot running? : {0}".format(processExecuting)

if (processExecuting == True):
    time.sleep(2)
    processExecuting = check_process("node bot.js")
  
    if (processExecuting == True):
      print "Planck bot still running. Killing it!"
      kill_bot()

subprocess_cmd("git pull")
start_bot()

#root@localhost:~#

  
