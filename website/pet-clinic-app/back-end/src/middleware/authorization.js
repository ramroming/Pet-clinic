
const admin = (req, res, next) => {
  if (req.user.stmem_type !== 'admin')
    return res.status(403).send({ error: 'Unauthorized!!' })
 
  next()
}
const rec = (req, res, next) => {
  if (req.user.stmem_type !== 'receptionist' && req.user.stmem_type !== 'admin')
    return res.status(403).send({ error: 'Unauthorized!!' })
 
  next()
}
const vet = (req, res, next) => {
  if (req.user.stmem_type !== 'vet' && req.user.stmem_type !== 'admin')
    return res.status(403).send({ error: 'Unauthorized!!' })
 
  next()
}
const trainer = (req, res, next) => {
  if (req.user.stmem_type !== 'trainer' && req.user.stmem_type !== 'admin')
    return res.status(403).send({ error: 'Unauthorized!!' })
 
  next()
}

const shared = (req, res, next) => {
  if (req.user.stmem_type !== 'trainer' && req.user.stmem_type !== 'vet' && req.user.stmem_type !== 'groomer' && req.user.stmem_type !== 'admin')
    return res.status(403).send({ error: 'Unauthorized!!' })

  next()
}

export default {
  admin,
  rec,
  vet,
  trainer,
  shared
}