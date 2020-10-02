import glob

print(sorted(glob.glob("*.jpg"), reverse=True))