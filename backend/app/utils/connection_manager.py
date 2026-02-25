import asyncio
from typing import Dict

class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[int, asyncio.Queue] = {}

    def connect(self, branch_id: int) -> asyncio.Queue:
        queue = asyncio.Queue()
        self.active_connections[branch_id] = queue
        return queue
    
    def disconnect(self, branch_id: int):
        self.active_connections.pop(branch_id, None)

    async def send_to_branch(self, branch_id: int, data: dict):
        queue = self.active_connections.get(branch_id)
        if queue:
            await queue.put(data)

manager = ConnectionManager()
    