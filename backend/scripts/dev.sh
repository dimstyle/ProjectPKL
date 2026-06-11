#!/usr/bin/env bash

SESSION="workspace"

# =========================
# GANTI PERINTAH DI SINI
# =========================

CMD_RIGHT_TOP="docker run --rm --name db_dev_env -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password -e POSTGRES_DB=users -p 5432:5432 -v $(pwd)/var:/var/lib/postgresql:Z postgres:latest"
CMD_RIGHT_BOTTOM="air -d"

# Hapus session lama kalau ada
tmux has-session -t "$SESSION" 2>/dev/null
if [ $? -eq 0 ]; then
    tmux kill-session -t "$SESSION"
fi

# Buat session baru
tmux new-session -d -s "$SESSION"

# Layout:
# +---------+------+
# |         | atas |
# |  kiri   +------+
# |         | bawah|
# +---------+------+

# Kanan 30%, kiri 70%
tmux split-window -h -p 30 -t "$SESSION"

# Bagi kanan jadi atas-bawah
tmux split-window -v -t "$SESSION:0.1"

# Jalankan perintah
tmux send-keys -t "$SESSION:0.1" "$CMD_RIGHT_TOP" C-m
tmux send-keys -t "$SESSION:0.2" "$CMD_RIGHT_BOTTOM" C-m

# Fokus ke pane kiri
tmux select-pane -t "$SESSION:0.0"

# Masuk ke session
tmux attach -t "$SESSION"