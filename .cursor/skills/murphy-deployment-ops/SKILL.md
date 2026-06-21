---
name: murphy-deployment-ops
description: Murphy Cloud deployment and operations procedures for Containerfile, Podman, compose, image build/push, upload persistence, database backup/restore, Zot registry, and Murphy Cloud deployment docs. Use when changing deployment behavior, environment variables, volumes, ports, backups, restore scripts, or production troubleshooting.
---

# Murphy Deployment Ops

Use this skill for deployment detail shared by Murphy Cloud products.

## Required External Locations

When code changes affect deployment or operations, check:

- Docs: `/Users/murphy/work/projects/main/docs/product/murphy-cloud`
- Deployment repo: `/Users/murphy/work/projects/murphy-cloud/murphy-deploy`

## Image and Registry

Murphy products commonly use Zot:

```text
zot.murphylan.cloud/murphy/<product>:<tag>
```

Build/push scripts should hide registry details and use `--tls-verify=false` for Podman when needed.

## Podman Build Resources

If Next build dies with little output, suspect SIGKILL/OOM. Check:

```bash
podman machine inspect
```

Prefer at least 4GB memory for local Podman builds, often 6GB.

## Upload Persistence

For product uploads, bind mount a host directory:

```yaml
volumes:
  - ./uploads:/app/uploads:U
```

With Podman, `:U` adjusts host ownership for the container user.

## Backup and Restore

Prefer product-provided scripts such as `scripts/backup.sh` and `scripts/restore.sh`.

Database restore does not restore uploaded files; restore uploads separately.

## Production Troubleshooting

- `no space left on device` during pull: check `df -h`, `df -ih`, `podman system df`.
- `Failed to find Server Action`: refresh browser or re-login after deployment.
- Upload permission denied: check volume mount, host directory ownership, and runtime user.

## Checklist

- Env vars are represented in deploy scripts and docs.
- Ports/domains match Murphy Cloud docs.
- Volumes are persistent and writable.
- Database and upload backup/restore instructions are accurate.
