import struct, zlib, os

def create_png(path, w, h, r, g, b):
    def chunk(ctype, data):
        c = struct.pack('>I', len(data)) + ctype.encode() + data
        return c + struct.pack('>I', zlib.crc32(c[4:]) & 0xffffffff)
    
    raw = bytearray()
    for y in range(h):
        raw.append(0)
        for x in range(w):
            raw += [r, g, b]
    
    sig = b'\x89PNG\r\n\x1a\n'
    ihdr = chunk('IHDR', struct.pack('>IIBBBBB', w, h, 8, 2, 0, 0, 0))
    idat = chunk('IDAT', zlib.compress(bytes(raw)))
    iend = chunk('IEND', b'')
    
    with open(path, 'wb') as f:
        f.write(sig + ihdr + idat + iend)

os.chdir(r'O:\xampp\htdocs\webmobil\icons')
create_png('icon-192.png', 192, 192, 255, 111, 0)
create_png('icon-512.png', 512, 512, 255, 111, 0)
create_png('icon-144.png', 144, 144, 255, 111, 0)
create_png('icon-152.png', 152, 152, 255, 111, 0)
create_png('icon-384.png', 384, 384, 255, 111, 0)
create_png('icon-96.png', 96, 96, 255, 111, 0)
create_png('icon-128.png', 128, 128, 255, 111, 0)
create_png('icon-72.png', 72, 72, 255, 111, 0)
print('PNG icons created')
