while true; do
curl 'https://compreaqui.repl.co/__tail' > /dev/null &
sleep 10
clear
pkillall curl
done